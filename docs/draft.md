

무엇을 만들것인가?
    식단 기록 할 수 있는 어플리케이션

    어떤 기능이 필요한가?
        - 매일 먹은 식단을 기록할 수 있어야 한다.
            - 메뉴
            - 시간
            - 태깅
                - 용량
                - 좋고 나쁨
        - 식단 기록을 볼 수 있어야 한다.
            - 전체
            - 월
            - 주
            - 오늘
        - 이미지 export 할 수 있어야 한다.
            - 좋고 나쁨 정보 구분을 색으로 표현한다.
        - 식단에 따른 칼로리가 계산될 수 있다.
        - 개인 정보에 따른 좋고 나쁨 판단이 가능해야 한다.

    draft
    어떤 관점으로 어플리케이션 동작을 바라볼 것인가?
    - 이벤트
    - cmd
        - usecase (clean architecture)
    - 상호작용
        - 객체지향
            json = json_parser.parse(stream)
            json = Json.from_stream(stream)


    usecase

        CreateDiet
        EditDiet
        DeleteDiet

        GetDietById

        ---
        GetTodaysDiet
        GetMontlyDiet

        ---
        QueryDiet



    entity
        Diet
            - 고유 아이디
            - 언제 먹었냐?
            - 언제 기록했냐?
            - 누구의?
            - 이름
                - 점심...

            - foods
                - food
                    - 이름 name
                        - 당근, 홍당근, ...
                    - 용량 volume
                        - 1개, 300ml, 100g
                            -1, 개
                    - 평가 rating
                        - 1~5



    ddd
        aggregate
            entity
            value object

    diet.foods.add(food) x
    diet.add_food(food) o


    어떻게 상호작용할까?

    ddiary diet create \
    --at <ddate> \
    --by <name> \
    --food "당근;1개;4" \
    --food "우유;2ml;3"

    ddiary diet edit <id> \
    --add-food "당근;1개;4"
    --rm-food "당근"

    --or--

    ddiary diet edit <id> \
    --add "당근;1개;4"
    --rm "당근"

    ddiary diet delete <id>

    ddiary diet ls
    ddiary diet ls --today
    ddiary diet ls --week
    ddiary diet ls --month










    프로젝트 구조
    
    build
    src
        cli.ts
        domain
            diet
                repo.ts
                infra
                    InMemRepo.ts
                entity
                    diet.ts food.ts
                usecase
                    CreateDiet.ts EditDiet.ts DeleteDiet.ts GetDietById.ts QueryDiet.ts ExportDiet.ts
        common
            result.ts















