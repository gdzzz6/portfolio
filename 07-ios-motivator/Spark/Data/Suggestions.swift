import SwiftUI

enum Energy: Int, CaseIterable, Identifiable {
    case low = 1, medium, high

    var id: Int { rawValue }

    var title: String {
        switch self {
        case .low: "Мало сил"
        case .medium: "Нормально"
        case .high: "Полон энергии"
        }
    }

    var icon: String {
        switch self {
        case .low: "battery.25"
        case .medium: "battery.75"
        case .high: "bolt.fill"
        }
    }
}

enum IdeaCategory: String, CaseIterable, Identifiable {
    case body, mind, creative, offline, people, order

    var id: String { rawValue }

    var title: String {
        switch self {
        case .body: "Тело"
        case .mind: "Ум"
        case .creative: "Творчество"
        case .offline: "Офлайн"
        case .people: "Люди"
        case .order: "Порядок"
        }
    }

    var icon: String {
        switch self {
        case .body: "figure.run"
        case .mind: "brain.head.profile"
        case .creative: "paintbrush.pointed.fill"
        case .offline: "leaf.fill"
        case .people: "person.2.fill"
        case .order: "sparkles"
        }
    }

    var color: Color {
        switch self {
        case .body: Theme.coral
        case .mind: Theme.violet
        case .creative: Theme.pink
        case .offline: Theme.mint
        case .people: Theme.amber
        case .order: Theme.sky
        }
    }

    /// В какую категорию задач попадает идея при добавлении в список.
    var taskCategory: TaskCategory {
        switch self {
        case .body: .health
        case .mind: .study
        case .creative: .creative
        case .offline, .people: .personal
        case .order: .home
        }
    }
}

enum DayPart: String, CaseIterable {
    case morning, afternoon, evening

    var title: String {
        switch self {
        case .morning: "Утро"
        case .afternoon: "День"
        case .evening: "Вечер"
        }
    }

    var icon: String {
        switch self {
        case .morning: "sunrise.fill"
        case .afternoon: "sun.max.fill"
        case .evening: "moon.stars.fill"
        }
    }
}

struct Suggestion: Identifiable, Hashable {
    let title: String
    let detail: String
    let icon: String
    let category: IdeaCategory
    let minutes: Int
    let energy: Energy
    let parts: Set<DayPart>

    var id: String { title }
}

struct PlanItem: Identifiable {
    let part: DayPart
    let idea: Suggestion
    var id: String { part.rawValue + idea.id }
}

enum Suggestions {
    private static let any: Set<DayPart> = [.morning, .afternoon, .evening]

    static let all: [Suggestion] = [
        // Тело
        Suggestion(title: "Зарядка 10 минут", detail: "Приседания, отжимания, планка — разгоняет кровь лучше кофе.", icon: "figure.strengthtraining.functional", category: .body, minutes: 10, energy: .medium, parts: [.morning]),
        Suggestion(title: "Прогулка без наушников", detail: "30 минут пешком и только свои мысли. Идеи приходят сами.", icon: "figure.walk", category: .body, minutes: 30, energy: .low, parts: any),
        Suggestion(title: "Пробежка", detail: "Лёгкий темп 20–30 минут. Главное — выйти за дверь.", icon: "figure.run", category: .body, minutes: 30, energy: .high, parts: [.morning, .evening]),
        Suggestion(title: "Растяжка", detail: "15 минут на спину, шею и ноги. Тело скажет спасибо.", icon: "figure.cooldown", category: .body, minutes: 15, energy: .low, parts: [.morning, .evening]),
        Suggestion(title: "Выпить 2 стакана воды", detail: "Половина усталости — это просто обезвоживание.", icon: "drop.fill", category: .body, minutes: 2, energy: .low, parts: any),
        Suggestion(title: "Приготовить полезный обед", detail: "Овощи, белок, без спешки. Еда — тоже забота о себе.", icon: "fork.knife", category: .body, minutes: 40, energy: .medium, parts: [.afternoon]),
        Suggestion(title: "Тренировка дома", detail: "Найди 30-минутную программу и пройди её до конца.", icon: "dumbbell.fill", category: .body, minutes: 30, energy: .high, parts: any),
        Suggestion(title: "Велопрогулка", detail: "Новый маршрут по району — маленькое приключение.", icon: "bicycle", category: .body, minutes: 45, energy: .high, parts: [.afternoon, .evening]),

        // Ум
        Suggestion(title: "Прочитать 20 страниц", detail: "Книга вместо ленты. 20 страниц в день — это 25 книг в год.", icon: "book.fill", category: .mind, minutes: 30, energy: .low, parts: any),
        Suggestion(title: "Урок иностранного языка", detail: "15 минут в приложении или 10 новых слов в тетрадь.", icon: "character.bubble.fill", category: .mind, minutes: 15, energy: .medium, parts: any),
        Suggestion(title: "Посмотреть лекцию", detail: "Одна полезная лекция вместо десяти коротких видео.", icon: "play.rectangle.fill", category: .mind, minutes: 40, energy: .low, parts: [.afternoon, .evening]),
        Suggestion(title: "Решить задачи на логику", detail: "Судоку, шахматная задача или головоломка — разминка для мозга.", icon: "puzzlepiece.fill", category: .mind, minutes: 20, energy: .medium, parts: any),
        Suggestion(title: "Изучить новый навык", detail: "Выбери то, что давно хотел: код, монтаж, гитара. Первый урок — сегодня.", icon: "graduationcap.fill", category: .mind, minutes: 45, energy: .high, parts: any),
        Suggestion(title: "Медитация", detail: "10 минут тишины: сядь, закрой глаза, следи за дыханием.", icon: "wind", category: .mind, minutes: 10, energy: .low, parts: [.morning, .evening]),
        Suggestion(title: "Записать 3 цели на неделю", detail: "Конкретно, измеримо и на бумаге.", icon: "target", category: .mind, minutes: 10, energy: .medium, parts: [.morning]),

        // Творчество
        Suggestion(title: "Нарисовать что-нибудь", detail: "Не важно как. Скетч того, что видишь из окна.", icon: "pencil.and.scribble", category: .creative, minutes: 20, energy: .low, parts: any),
        Suggestion(title: "Написать страницу текста", detail: "Дневник, рассказ, пост — просто пиши, не редактируя.", icon: "square.and.pencil", category: .creative, minutes: 20, energy: .medium, parts: any),
        Suggestion(title: "Фотопрогулка", detail: "Сделай 10 красивых кадров вокруг дома. Ищи свет и детали.", icon: "camera.fill", category: .creative, minutes: 40, energy: .medium, parts: [.afternoon, .evening]),
        Suggestion(title: "Приготовить новое блюдо", detail: "Рецепт, который ты ещё ни разу не пробовал.", icon: "frying.pan.fill", category: .creative, minutes: 60, energy: .high, parts: [.afternoon, .evening]),
        Suggestion(title: "Сыграть на инструменте", detail: "Или начать учиться — первые аккорды за вечер реальны.", icon: "guitars.fill", category: .creative, minutes: 30, energy: .medium, parts: [.afternoon, .evening]),
        Suggestion(title: "Сделать что-то своими руками", detail: "Поделка, ремонт мелочи, оригами — руки соскучились по делу.", icon: "hammer.fill", category: .creative, minutes: 45, energy: .high, parts: any),

        // Офлайн
        Suggestion(title: "Час без телефона", detail: "Убери телефон в другую комнату. Посмотри, сколько успеешь.", icon: "iphone.slash", category: .offline, minutes: 60, energy: .medium, parts: any),
        Suggestion(title: "Утро без соцсетей", detail: "Не открывай ленты до обеда. Голова будет ясной весь день.", icon: "sunrise.fill", category: .offline, minutes: 0, energy: .low, parts: [.morning]),
        Suggestion(title: "Посидеть в парке", detail: "Без цели. Просто подышать и посмотреть на небо.", icon: "tree.fill", category: .offline, minutes: 30, energy: .low, parts: [.afternoon, .evening]),
        Suggestion(title: "Настольная игра", detail: "С семьёй, друзьями или головоломка в одиночку.", icon: "die.face.5.fill", category: .offline, minutes: 45, energy: .medium, parts: [.evening]),
        Suggestion(title: "Лечь спать до 23:00", detail: "Лучшая инвестиция в завтрашнюю продуктивность.", icon: "bed.double.fill", category: .offline, minutes: 0, energy: .low, parts: [.evening]),
        Suggestion(title: "Поехать в новое место", detail: "Музей, кафе, район, где ты не был. Мозгу нужна новизна.", icon: "map.fill", category: .offline, minutes: 120, energy: .high, parts: [.afternoon]),

        // Люди
        Suggestion(title: "Позвонить близкому", detail: "Не написать — именно позвонить. Маме, другу, бабушке.", icon: "phone.fill", category: .people, minutes: 15, energy: .low, parts: [.afternoon, .evening]),
        Suggestion(title: "Встретиться с другом", detail: "Живая встреча заряжает сильнее сотни сообщений.", icon: "person.2.fill", category: .people, minutes: 90, energy: .high, parts: [.afternoon, .evening]),
        Suggestion(title: "Сделать комплимент", detail: "Искренне похвали кого-то сегодня. Это заразно.", icon: "heart.text.square.fill", category: .people, minutes: 1, energy: .low, parts: any),
        Suggestion(title: "Помочь кому-то", detail: "Соседу, коллеге, незнакомцу. Доброе дело — лучший антистресс.", icon: "hands.sparkles.fill", category: .people, minutes: 20, energy: .medium, parts: any),
        Suggestion(title: "Написать благодарность", detail: "Сообщение человеку, который на тебя повлиял.", icon: "envelope.fill", category: .people, minutes: 10, energy: .low, parts: any),

        // Порядок
        Suggestion(title: "Убраться на столе", detail: "Чистое пространство — чистая голова. 10 минут.", icon: "sparkles", category: .order, minutes: 10, energy: .low, parts: any),
        Suggestion(title: "Разобрать одну полку", detail: "Выбрось или отдай то, чем не пользовался год.", icon: "archivebox.fill", category: .order, minutes: 20, energy: .medium, parts: any),
        Suggestion(title: "Спланировать завтра", detail: "Запиши 3 главные задачи на завтра. Утро начнётся легче.", icon: "list.bullet.clipboard.fill", category: .order, minutes: 10, energy: .low, parts: [.evening]),
        Suggestion(title: "Генеральная уборка комнаты", detail: "Включи музыку и наведи порядок за час.", icon: "bubbles.and.sparkles.fill", category: .order, minutes: 60, energy: .high, parts: [.morning, .afternoon]),
        Suggestion(title: "Разобрать фото в телефоне", detail: "Удали лишнее, освободи память и место в голове.", icon: "photo.stack.fill", category: .order, minutes: 15, energy: .low, parts: [.evening]),
        Suggestion(title: "Закрыть одно отложенное дело", detail: "То, что висит неделями. Сделай сегодня — и выдохни.", icon: "checkmark.circle.fill", category: .order, minutes: 30, energy: .high, parts: any),
    ]

    static func filtered(energy: Energy?, category: IdeaCategory?) -> [Suggestion] {
        all.filter { s in
            (energy == nil || s.energy.rawValue <= energy!.rawValue) &&
            (category == nil || s.category == category)
        }
    }

    /// Идея дня — меняется раз в сутки.
    static func ofDay(_ date: Date = Date()) -> Suggestion {
        let day = Calendar.current.ordinality(of: .day, in: .era, for: date) ?? 0
        return all[(day * 7) % all.count]
    }

    /// Собирает план из трёх активностей разных категорий: утро, день, вечер.
    static func dayPlan(energy: Energy) -> [PlanItem] {
        var usedCategories = Set<IdeaCategory>()
        var plan: [PlanItem] = []
        for part in DayPart.allCases {
            let pool = all.filter { $0.parts.contains(part) && $0.energy.rawValue <= energy.rawValue }
            let fresh = pool.filter { !usedCategories.contains($0.category) }
            if let pick = (fresh.isEmpty ? pool : fresh).randomElement() {
                usedCategories.insert(pick.category)
                plan.append(PlanItem(part: part, idea: pick))
            }
        }
        return plan
    }
}
