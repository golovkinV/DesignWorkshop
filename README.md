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
