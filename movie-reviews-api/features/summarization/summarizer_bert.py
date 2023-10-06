from summarizer import Summarizer


def summarize_bert(text, ratio):
    ratio = ratio / 100
    bert = Summarizer()
    summarization = bert(text, ratio=ratio)
    return summarization


def summarize_many_bert(texts, ratio):
    ratio = ratio / 100
    bert = Summarizer()
    output = []
    for text in texts:
        output.append(bert(text, ratio=ratio))

    return output
