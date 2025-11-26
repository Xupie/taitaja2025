FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip libpng-dev libonig-dev libxml2-dev && \
    docker-php-ext-install pdo pdo_mysql mysqli

RUN a2enmod rewrite
RUN a2enmod headers

RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

WORKDIR /var/www/html