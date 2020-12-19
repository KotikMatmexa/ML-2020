# ML-2020

## Задачи
Рассматривалась модель, способная по короткому фрагменту записи речи, воспроизводить закодированный голос для произвольного текста. 

- [ ] Изучить статью, материалы по составляющим моделям
- [ ] Провести пробный запуск на предобученных моделях
- [ ] Подготовить промежуточные отчеты
- [ ] Реализовать клиент-сервер для работы модели
- [ ] Создать докер образ приложения для удобства тестирования и демонстрации
- [ ] Обучить модели для русского языка

## Основные ресурсы
* Материалы статьи \
https://arxiv.org/abs/1806.04558 
* Ссылка на репозиторий с имплементацией из которого взято большинство элементов \
https://github.com/CorentinJ/Real-Time-Voice-Cloning
* Пример работы в jupyter c кодом для отдельных элемнтов \
https://github.com/CorentinJ/Real-Time-Voice-Cloning/blob/master/demo_toolbox_collab.ipynb\
* Примеры от авторов статьи \
https://google.github.io/tacotron/publications/speaker_adaptation/
* Предобученные модели используемые для тестов (скачать, закинуть в основную папку) \
https://drive.google.com/file/d/1n1sPXvT34yXFLT47QZA6FIRGrwMeSsZc/view

## Инструкция по запуску
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

## Основные проблемы
1. Проблемы с запуском (как и отмечалось авторами модели - запуск трудоемкий, требует много библиотек и самое главное - использует tensorflow 1.15)
2. Сложность обучения дополнительных моделей 
Авторы прилагают предобученную модель, и алгоритм обучения, работающий для обучения еще на двух дополнительных датасетах, однако требуются данные с специфичной структурой (исправимая проблема) и объем данных должен быть очень большим (500гб и более). Подходящие данные есть (https://github.com/snakers4/open_stt/), но работать с такими объемами данных на персональных пк не выйдет (а в случае использования маленьких сабсетов, результат получится крайне низкого качества)
