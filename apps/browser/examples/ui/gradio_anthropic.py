import os
import asyncio
from dataclasses import dataclass
from typing import List, Optional

# Third-party imports
import gradio as gr
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from rich.console import Console
from rich.panel import Panel
from rich.text import Text

# Local module imports
from browser_use import Agent

load_dotenv()


@dataclass
class ActionResult:
	is_done: bool
	extracted_content: Optional[str]
	error: Optional[str]
	include_in_memory: bool


@dataclass
class AgentHistoryList:
	all_results: List[ActionResult]
	all_model_outputs: List[dict]


def parse_agent_history(history_str: str) -> None:
	console = Console()

	# Split the content into sections based on ActionResult entries
	sections = history_str.split('ActionResult(')

	for i, section in enumerate(sections[1:], 1):  # Skip first empty section
		# Extract relevant information
		content = ''
		if 'extracted_content=' in section:
			content = section.split('extracted_content=')[1].split(',')[0].strip("'")

		if content:
			header = Text(f'Step {i}', style='bold blue')
			panel = Panel(content, title=header, border_style='blue')
			console.print(panel)
			console.print()


async def run_browser_task(
	task: str,
	api_key: str,
	model: str = 'claude-3-opus-20240229',
	headless: bool = True,
) -> str:
	if not api_key.strip():
		return 'Please provide an API key'

	os.environ['ANTHROPIC_API_KEY'] = api_key

	try:
		agent = Agent(
			task=task,
			llm=ChatAnthropic(model=model),
		)
		result = await agent.run()
		#  TODO: The result cloud be parsed better
		return result
	except Exception as e:
		return f'Error: {str(e)}'


def create_ui():
	with gr.Blocks(title='SupaBrowser - Browser Use Integration') as interface:
		gr.Markdown('# SupaBrowser - Browser Automation')
		gr.Markdown('Powered by browser-use with Anthropic Claude')

		with gr.Row():
			with gr.Column():
				api_key = gr.Textbox(
					label='Anthropic API Key', 
					placeholder='sk-ant-...', 
					type='password',
					value=os.environ.get('ANTHROPIC_API_KEY', '')
				)
				task = gr.Textbox(
					label='Task Description',
					placeholder='E.g., Find flights from New York to London for next week',
					lines=3,
				)
				model = gr.Dropdown(
					choices=[
						'claude-3-opus-20240229',
						'claude-3-sonnet-20240229',
						'claude-3-haiku-20240307'
					], 
					label='Model', 
					value='claude-3-opus-20240229'
				)
				headless = gr.Checkbox(label='Run Headless', value=True)
				submit_btn = gr.Button('Run Task')

			with gr.Column():
				output = gr.Textbox(label='Output', lines=10, interactive=False)

		submit_btn.click(
			fn=lambda *args: asyncio.run(run_browser_task(*args)),
			inputs=[task, api_key, model, headless],
			outputs=output,
		)

	return interface


if __name__ == '__main__':
	demo = create_ui()
	demo.launch() 