import SwiftUI

// MARK: - Задачи

enum Priority: Int, Codable, CaseIterable, Identifiable {
    case low = 1, medium = 2, high = 3

    var id: Int { rawValue }

    var title: String {
        switch self {
        case .low: "Лёгкая"
        case .medium: "Важная"
        case .high: "Главная"
        }
    }

    var color: Color {
        switch self {
        case .low: Theme.mint
        case .medium: Theme.sky
        case .high: Theme.coral
        }
    }

    /// Сколько очков продуктивности даёт выполненная задача.
    var points: Int { rawValue }
}

enum TaskCategory: String, Codable, CaseIterable, Identifiable {
    case personal, work, study, health, home, creative

    var id: String { rawValue }

    var title: String {
        switch self {
        case .personal: "Личное"
        case .work: "Работа"
        case .study: "Учёба"
        case .health: "Здоровье"
        case .home: "Дом"
        case .creative: "Творчество"
        }
    }

    var icon: String {
        switch self {
        case .personal: "person.fill"
        case .work: "briefcase.fill"
        case .study: "book.fill"
        case .health: "heart.fill"
        case .home: "house.fill"
        case .creative: "paintpalette.fill"
        }
    }
}

struct TaskItem: Identifiable, Codable, Equatable {
    var id = UUID()
    var title: String
    var note: String = ""
    var priority: Priority = .medium
    var category: TaskCategory = .personal
    var createdAt = Date()
    var completedAt: Date?

    var isDone: Bool { completedAt != nil }
}

// MARK: - Настроение

enum Mood: Int, Codable, CaseIterable, Identifiable {
    case awful = 1, bad, okay, good, great

    var id: Int { rawValue }

    var emoji: String {
        switch self {
        case .awful: "😫"
        case .bad: "😕"
        case .okay: "😐"
        case .good: "🙂"
        case .great: "🤩"
        }
    }

    var title: String {
        switch self {
        case .awful: "Тяжело"
        case .bad: "Так себе"
        case .okay: "Нормально"
        case .good: "Хорошо"
        case .great: "Отлично"
        }
    }

    /// Короткий ответ приложения на выбранное настроение.
    var reply: String {
        switch self {
        case .awful: "Бывает. Начни с самого маленького шага — даже стакан воды считается."
        case .bad: "Не жди вдохновения. Пять минут дела — и станет легче."
        case .okay: "Нормальный день — отличная база. Добавь в него одну яркую задачу."
        case .good: "Отличный настрой! Самое время взяться за главную задачу."
        case .great: "Ты на волне 🔥 Используй энергию на то, что давно откладывал."
        }
    }
}

// MARK: - Уровень продуктивности

struct ProductivityLevel {
    let title: String
    let subtitle: String
    let color: Color

    static func forScore(_ score: Int) -> ProductivityLevel {
        switch score {
        case ..<20: .init(title: "Разминка", subtitle: "День только начинается", color: Theme.sky)
        case ..<45: .init(title: "Разгон", subtitle: "Ты набираешь обороты", color: Theme.mint)
        case ..<70: .init(title: "В ритме", subtitle: "Хороший темп, держи его", color: Theme.amber)
        case ..<90: .init(title: "В потоке", subtitle: "Продуктивность зашкаливает", color: Theme.pink)
        default: .init(title: "Огонь 🔥", subtitle: "Идеальный день. Ты лучший!", color: Theme.coral)
        }
    }
}

// MARK: - Даты

extension Date {
    private static let dayKeyFormatter: DateFormatter = {
        let f = DateFormatter()
        f.calendar = Calendar(identifier: .gregorian)
        f.locale = Locale(identifier: "en_US_POSIX")
        f.dateFormat = "yyyy-MM-dd"
        return f
    }()

    /// Ключ дня для хранения статистики (например, "2026-10-26").
    var dayKey: String { Date.dayKeyFormatter.string(from: self) }

    func adding(days: Int) -> Date {
        Calendar.current.date(byAdding: .day, value: days, to: self) ?? self
    }
}

extension Locale {
    static let ru = Locale(identifier: "ru_RU")
}
