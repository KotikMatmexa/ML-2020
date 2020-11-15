# ML-2020


Ссылка на статью\
https://arxiv.org/abs/1806.04558\

Ссылка на репозиторий с имплементацией из которого взято большинство элементов
https://github.com/CorentinJ/Real-Time-Voice-Cloning


Пример работы в jupyter c кодом для отдельных элемнтов\
https://github.com/CorentinJ/Real-Time-Voice-Cloning/blob/master/demo_toolbox_collab.ipynb\


Примеры от авторов статьи\
https://google.github.io/tacotron/publications/speaker_adaptation/

Предобученные модели используемые для тестов (скачать, закинуть в основную папку)\
https://drive.google.com/file/d/1n1sPXvT34yXFLT47QZA6FIRGrwMeSsZc/view


For run on CPU you need TenserFlow=1.15 version. 
This version supported by python3.x.x-python3.7.x version. 
(DON'T USE 3.8+ verssions)

Quick Start:
1. clone repo
2. download model https://drive.google.com/file/d/1n1sPXvT34yXFLT47QZA6FIRGrwMeSsZc/view
3. extract this to project dir
4. Build docker image
```
docker build --tag voice:latest .
```
5. Run docker image
```
docker run <container_id>
```
HELP ZONE:
You can find container_id by run following command
```
docker images -a
```
if you want to kill image use following command
```
docker rm <container_id>
```

