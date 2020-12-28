# Design Workshop
Проект по предмету Проектный практикум


## API

**base_url**: http://localhost:8080/api

1. Получение данных по **Пользователю:**

      + GET-запросы: 
      
            1. Все пользователи: /user/all
            
            2. Авторизация: /user
                  Модель object: 
                        let data = {
                              login: "user",
                              password: "password"
                         }
            
            3. Пользователь по id: /user/{user_id}


      + POST-запросы: 
      
            1. Регистрация: /user         
                  Модель object: 
                        let data = {
                              login: "user",
                              password: "password",
                              firstName: "User",
                              lastName: "User",
                              avatar: URL
                         }
                         
      + PUT-запросы
      
            1. Редактировать пользователя: /user/{user_id}
                  Модель object: 
                        let data = {
                              login: "user",
                              password: "password",
                              firstName: "User",
                              lastName: "User",
                              avatar: URL,
                              role: "{role_id}",
                              articles: []
                         }
                         
2. Получение данных по **Ролям:**

      + GET-запросы: 
      
            1. Все роли: /role/all
            
            2. Роль по id: /role/{role_id}
            
      + POST-запросы: 
      
            1. Добавить роль: /role/add       
                  Модель object: 
                        let data = {
                              name: "название"
                         }
                         
      + DELETE-запрос: **/role/{role_id}**
      
3. Получение данных по **Тэгам:**

      + GET-запросы: 
      
            1. Все тэги: /tag/all
            
            2. Тэг по id: /tag/{tag_id}
            
      + POST-запросы: 
      
            1. Добавить тэг: /tag/add         
                  Модель object: 
                        let data = {
                              name: "название"
                         }
                         
4. Получение данных по **Статьям:**

      + GET-запросы: 
      
            1. Все статьи: /article/all
            
            2. Статья по id: /article/{article_id}
            
      + POST-запросы: 
      
            1. Добавить статью: /article/{user_id}         
                  Модель object: 
                        let data = {
                              title: "Test Creation Article",
                              content: "Testing #1",
                              image: URL,
                              tag: "{tag_id}"
                         }
                         
               Tag необязательный параметр. Если его не передавать, то статья будет относиться к "No tag".
               
      + PUT-запросы
      
            1. Редактировать статью: /article/{article_id}
                  В body передается модель Article
                  
      + DELETE-запрос: **/article/{article_id}**

5. Загрузка **Изображений:**
            
      + POST-запросы: 
      
            1. Загрузить изображение: /image/upload        
                  Отправка изображения через form-data:
                        const formData = new FormData();
                        formData.append('file', image);
                        
               Ответ запроса: URL изображения, которое потом отправляется на сервер при Регистрации пользователя**/Создании статьи
