from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from schemas import AskResponse
from get_response import get_response
from urllib.parse import unquote
from fastapi.middleware.cors import CORSMiddleware
import traceback

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CREDENTIALS = "NzQ1Y2VhN2UtY2U1NC00N2YwLTgxZGUtMGI5Mzg5YzljMjlkOjM1NDA2NWUzLTYwNjMtNGQyNS04NWUwLWI4NzUzMThlOGEzOQ=="
SCOPE = "GIGACHAT_API_PERS"


# def fix_encoding(s: str) -> str:
#     try:
#         return s.encode('latin1').decode('utf-8')
#     except UnicodeDecodeError:
#         return s  # Вернёт оригинал, если не удалось декодировать


@app.post("/ask")
async def ask_model(
    city: str = Form(...),
    wishes: str = Form(...),
    objects_count: int = Form(...)
) -> AskResponse:
    try:
        # city, wishes = unquote(city), unquote(wishes)
        print(city, wishes, objects_count, sep='\n')
        response = get_response(CREDENTIALS, SCOPE, city, wishes, objects_count)
        return {"answer": response}
    
    except Exception as e:
        print("Произошла ошибка:", traceback.format_exc())
        return JSONResponse(
            status_code=500,
            content={"error": f"Произошла ошибка: {str(e)}"}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)