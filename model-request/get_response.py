from langchain_gigachat import GigaChat
from langchain.schema import HumanMessage, SystemMessage 


def get_response(credentials: str, scope: str, city: str, wishes: str, objects_count: int = 5) -> str:
    """
    city - город, в котором будет строиться маршрут
    objects_count - количество объектов в маршруте, не рекомендуется использовать больше 10
    """

    chat = GigaChat(
        credentials=credentials,
        verify_ssl_certs = False,
        scope = scope,
        model='GigaChat-Max'
    )

    json_template = """
    [
        {
            "id": 1,
            "name": "Название",
            "description": "Описание",
            "address": "Адрес"
        }
    ]"""

    prompt = f"""Порядок объектов имеет значение. Покажи 6 мест.
        Составь маршрут для путешествия по городу {city}. 
        Меня интересует {wishes}.
        Порядок объектов имеет значение. Покажи {objects_count} мест.
        Не пиши рестораны подряд.
    """

    messages = [
        SystemMessage(content=f"Пиши ответ в формате json по примеру: {json_template}."),
        HumanMessage(content=prompt),
    ]

    answer = chat.invoke(messages).content
    return answer
