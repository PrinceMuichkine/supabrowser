import asyncio

from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic

from browser_use import Agent

load_dotenv()

# Initialize the model
llm = ChatAnthropic(
    model='claude-3-opus-20240229',
    temperature=0.0,
)
task = 'Find the founders of browser-use and draft them a short personalized message'

agent = Agent(task=task, llm=llm)


async def main():
    result = await agent.run()
    print("Task completed!")
    print("Result:", result)


if __name__ == '__main__':
    asyncio.run(main()) 