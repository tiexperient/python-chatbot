import google.generativeai as genai
import os
import sys
from dotenv import load_dotenv

# Garante UTF-8 na saída
sys.stdout.reconfigure(encoding='utf-8')

# Carrega variável de ambiente
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

try:
    pergunta = sys.argv[1] if len(sys.argv) > 1 else "Me conte uma fofoca de robô"
    model = genai.GenerativeModel("gemini-2.0-flash")
    resposta = model.generate_content(pergunta)

    # Valida se veio resposta
    if resposta and hasattr(resposta, "text"):
        print(resposta.text.strip())
    else:
        print("Desculpe, não consegui pensar em nada agora. 😅")

except Exception as e:
    print(f"Erro ao usar Gemini: {e}")