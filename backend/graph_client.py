import os
import requests
import msal

CLIENT_ID = os.getenv("CLIENT_ID")
TENANT_ID = os.getenv("TENANT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPE = ["https://graph.microsoft.com/.default"]

# 👤 Change this to your email or user ID from Azure AD
USER_ID = os.getenv("GRAPH_USER_ID", "you@yourdomain.com")

def get_access_token():
    app = msal.ConfidentialClientApplication(
        CLIENT_ID,
        authority=AUTHORITY,
        client_credential=CLIENT_SECRET
    )
    token_result = app.acquire_token_silent(SCOPE, account=None)
    if not token_result:
        token_result = app.acquire_token_for_client(scopes=SCOPE)
    return token_result.get("access_token")

def get_recent_emails(n=5):
    token = get_access_token()
    endpoint = f"https://graph.microsoft.com/v1.0/users/{USER_ID}/messages?$top={n}&$orderby=receivedDateTime DESC"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(endpoint, headers=headers)
    response.raise_for_status()
    data = response.json()
    
    emails = []
    for msg in data.get("value", []):
        emails.append({
            "subject": msg.get("subject"),
            "from": msg.get("from", {}).get("emailAddress", {}).get("address"),
            "body": msg.get("body", {}).get("content", "")
        })
    return emails
