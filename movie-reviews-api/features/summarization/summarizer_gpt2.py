from transformers import AutoTokenizer, AutoModel, AutoConfig
from summarizer import Summarizer


def summarize_gpt2(text, ratio):
    ratio = ratio / 100
    custom_config = AutoConfig.from_pretrained('gpt2')
    custom_config.output_hidden_states = True
    custom_tokenizer = AutoTokenizer.from_pretrained('gpt2')
    custom_model = AutoModel.from_pretrained('gpt2', config=custom_config)
    model = Summarizer(custom_model=custom_model, custom_tokenizer=custom_tokenizer)
    summarization = model(text, ratio=ratio)
    return summarization


def summarize_many_gpt2(texts, ratio):
    ratio = ratio / 100
    custom_config = AutoConfig.from_pretrained('gpt2')
    custom_config.output_hidden_states = True
    custom_tokenizer = AutoTokenizer.from_pretrained('gpt2')
    custom_model = AutoModel.from_pretrained('gpt2', config=custom_config)
    model = Summarizer(custom_model=custom_model, custom_tokenizer=custom_tokenizer)
    output = []
    for text in texts:
        output.append(model(text, ratio=ratio))

    return output
