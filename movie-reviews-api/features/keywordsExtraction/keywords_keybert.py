from keybert import KeyBERT


def get_keywords_keyBert(text, n_keywords):
    keybert = KeyBERT()
    kw = keybert.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words=None, top_n=n_keywords)
    kw = [k for k, score in kw]
    return kw


def get_keywords_many_texts_keyBert(texts, n_keywords):
    keybert = KeyBERT()
    output = []
    for text in texts:
        kw = keybert.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words=None, top_n=n_keywords)
        kw = [k for k, score in kw]
        output.append(kw)

    return output
