FROM ubuntu:latest

#add timezone configuration (need to skip timezone settings when build container)
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

FROM python:3.7

# create workdir
RUN mkdir /code
WORKDIR /code

# install requirements
COPY requirements.txt /code/
RUN pip3 install -r requirements.txt
RUN pip3 install torch==1.7.0+cpu torchvision==0.8.1+cpu torchaudio==0.7.0 -f https://download.pytorch.org/whl/torch_stable.html
RUN pip3 install ffmpeg-python

RUN pip3 install librosa \
	&& pip3 install soundfile \
	&& pip3 install --upgrade IPython


RUN apt-get update \
	&& apt-get upgrade -y \
	&& apt-get install -y \
	&& apt-get -y install apt-utils gcc libpq-dev libsndfile-dev

# get files and run script
COPY . /code/

# load models from google drive
RUN chmod +x get_model.sh
RUN ./get_model.sh

# run app
CMD ["python", "app.py"]