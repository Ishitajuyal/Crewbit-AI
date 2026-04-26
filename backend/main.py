import os
import uuid
import requests
import secrets
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse, JSONResponse
import msal

# ------------------ Load environment ------------------
load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
TENANT_ID = os.getenv("TENANT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI", "http://localhost:8000/ms/callback")

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPES = [
    "openid", "profile", "offline_access",
    "User.Read", "Mail.Read", "Files.Read.All", "Sites.Read.All"
]

# ------------------ FastAPI app ------------------
app = FastAPI()

# Allow frontend (React/Teams app) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Session middleware for storing token & user
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", secrets.token_urlsafe(32)),
    session_cookie="chatbot_session",
    max_age=3600,
    same_site="lax",
    https_only=False,
)

# ------------------ MSAL helpers ------------------
def build_msal_app(cache=None):
    return msal.ConfidentialClientApplication(
        CLIENT_ID,
        authority=AUTHORITY,
        client_credential=CLIENT_SECRET,
        token_cache=cache
    )

# ------------------ Routes ------------------

@app.get("/")
async def index(request: Request):
    """Home route showing login status"""
    user = request.session.get("user")
    if user:
        return {"message": f"Welcome {user['name']}", "email": user['email']}
    return {"message": "Not logged in. Go to /ms/login"}

@app.get("/ms/login")
def ms_login(request: Request):
    """Redirect to Microsoft login"""
    msal_app = build_msal_app()
    auth_url = msal_app.get_authorization_request_url(
        scopes=SCOPES, redirect_uri=REDIRECT_URI
    )
    return RedirectResponse(auth_url)

@app.get("/ms/callback")
def ms_callback(request: Request):
    """Microsoft OAuth2 callback"""
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Missing authorization code")

    msal_app = build_msal_app()
    result = msal_app.acquire_token_by_authorization_code(
        code, scopes=SCOPES, redirect_uri=REDIRECT_URI
    )

    if "access_token" in result:
        request.session["access_token"] = result["access_token"]
        request.session["user"] = {
            "name": result.get("id_token_claims", {}).get("name"),
            "email": result.get("id_token_claims", {}).get("preferred_username"),
        }
        return RedirectResponse("/")
    else:
        return {"error": result.get("error_description")}

@app.get("/me/emails")
async def get_emails(request: Request):
    """Fetch last 5 emails from signed-in user"""
    token = request.session.get("access_token")
    if not token:
        return {"error": "Not logged in"}

    headers = {"Authorization": f"Bearer {token}"}
    graph_url = "https://graph.microsoft.com/v1.0/me/messages?$top=5&$orderby=receivedDateTime DESC"
    resp = requests.get(graph_url, headers=headers)
    return JSONResponse(resp.json())

@app.post("/upload-policy")
async def upload_policy(file: UploadFile = File(...)):
    """Upload HR policy document (placeholder: just save filename)"""
    file_location = f"./uploads/{uuid.uuid4()}-{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())
    return {"status": "success", "filename": file.filename, "saved_as": file_location}

@app.get("/sentiment")
async def analyze_sentiment(request: Request):
    """Placeholder: Run sentiment analysis on last 5 emails"""
    token = request.session.get("access_token")
    if not token:
        return {"error": "Not logged in"}

    headers = {"Authorization": f"Bearer {token}"}
    graph_url = "https://graph.microsoft.com/v1.0/me/messages?$top=5&$orderby=receivedDateTime DESC"
    resp = requests.get(graph_url, headers=headers).json()

    sentiments = []
    for msg in resp.get("value", []):
        subject = msg.get("subject", "")
        # Placeholder: simple sentiment rule
        if any(word in subject.lower() for word in ["urgent", "problem", "issue"]):
            sentiment = "negative"
        else:
            sentiment = "neutral/positive"
        sentiments.append({"subject": subject, "sentiment": sentiment})

    return {"sentiments": sentiments}
