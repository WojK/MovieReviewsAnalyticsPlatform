from rake_nltk import Rake


def get_keywords_rake(text, n_keywords):
    rake = Rake(max_length=1)
    rake.extract_keywords_from_text(text)
    kw = rake.get_ranked_phrases()[0:n_keywords]
    return kw


def get_keywords_many_texts_rake(texts, n_keywords):
    rake = Rake(max_length=1)
    output = []
    for text in texts:
        rake.extract_keywords_from_text(text)
        kw = rake.get_ranked_phrases()[0:n_keywords]
        output.append(kw)

    return output
