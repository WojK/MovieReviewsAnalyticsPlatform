from nltk.tokenize import word_tokenize
from wordcloud import WordCloud
from bs4 import BeautifulSoup
from PIL import Image
import numpy as np
import os


def remove_html(text):
    soup = BeautifulSoup(text, "html.parser")
    return soup.get_text()


def process_remove_punctuation_tokenize(text):
    text = remove_html(text)
    output = []
    for word in word_tokenize(text.lower()):
        if word.isalpha():
            output.append(word)
    return " ".join(output)


def join_texts(texts):
    return " ".join(texts)


def generate_word_cloud(texts, output):
    texts = texts.apply(process_remove_punctuation_tokenize)

    wc_text = join_texts(texts)
    img_mask_path = os.path.abspath('./features/wordCloud/cloud_mask.png')
    mask = np.array(Image.open(img_mask_path))

    wc = WordCloud(mask=mask, background_color='white', contour_color='#023075', contour_width=1).generate(wc_text)
    wc.to_file(output)
