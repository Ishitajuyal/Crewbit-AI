from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os

db_location = "./chrome_langchain_db"

def get_retriever():
    embeddings = OllamaEmbeddings(model="mxbai-embed-large")

    vector_store = Chroma(
        collection_name="policy_uploads",
        persist_directory=db_location,
        embedding_function=embeddings
    )

    retriever = vector_store.as_retriever(search_kwargs={"k": 5})
    return retriever
