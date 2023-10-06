import yake


def get_keywords_yake(text, n_keywords):
    extractor = yake.KeywordExtractor(lan='en', n=1, top=n_keywords)
    keywords_with_scores = extractor.extract_keywords(text)
    keywords = [str.lower(keyword) for keyword, score in keywords_with_scores]
    return keywords


def get_keywords_many_texts_yake(texts, n_keywords):
    extractor = yake.KeywordExtractor(lan='en', n=1, top=n_keywords)
    output = []
    for text in texts:
        keywords_with_scores = extractor.extract_keywords(text)
        keywords = [str.lower(keyword) for keyword, score in keywords_with_scores]
        output.append(keywords)

    return output
