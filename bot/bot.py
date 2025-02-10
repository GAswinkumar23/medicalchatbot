import os
from embedchain import App

os.environ["OPENAI_API_KEY"] = "AIzaSyBmkny2RljHp1FMDrtwwE5QVcIwPgqU-is"

bot = App()

bot.add("https://en.wikipedia.org/wiki/Artificial_intelligence")  
bot.add("AI is a branch of computer science that deals with creating smart machines.")  

response = bot.query("What is Artificial Intelligence?")
print(response)
