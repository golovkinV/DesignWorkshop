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
                         
