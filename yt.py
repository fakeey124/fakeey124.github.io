import os
from pytube import YouTube
from moviepy.editor import *

def download_youtube_as_mp3(url, output_path='.'):
    """
    Скачивает видео с YouTube и конвертирует его в MP3.

    Аргументы:
    url (str): URL-адрес видео на YouTube.
    output_path (str): Путь для сохранения файла.
    """
    try:
        print("Подключение к YouTube...")
        yt = YouTube(url)
        
        # Получение аудиопотока самого высокого качества
        video = yt.streams.filter(only_audio=True).first()
        
        print(f"Загрузка аудио: '{yt.title}'...")
        out_file = video.download(output_path=output_path)
        
        # Сохранение файла с новым расширением
        base, ext = os.path.splitext(out_file)
        new_file = base + '.mp3'
        
        # Конвертация в MP3 с помощью moviepy
        print("Конвертация в MP3...")
        video_clip = AudioFileClip(out_file)
        video_clip.write_audiofile(new_file)
        
        # Удаление временного файла
        video_clip.close()
        os.remove(out_file)
        
        print(f"Готово! Файл сохранен как: {new_file}")
        
    except Exception as e:
        print(f"Произошла ошибка: {e}")

if __name__ == "__main__":
    youtube_url = input("Введите URL-адрес видео на YouTube: ")
    download_youtube_as_mp3(youtube_url)
