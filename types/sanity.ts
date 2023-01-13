type BaseType = {
    _id: string;
    _type: string;
    _createdAt: string;
    _rev: string;
    _updatedAt: string;
}

type SlugType = {
    current: string;
    _type: 'slug';
}

type CategoryType = BaseType & {
    title: string;
}

type DifficultyType = BaseType & {
    title: string;
    value: number;
}

export type BookType = BaseType & {
    title: string;
    series: string;
    slug: SlugType;
}

export type QuestionType = BaseType & {
    category: CategoryType;
    difficulty: DifficultyType;
    options: {
        _key: string;
        _type: 'option';
        title: string;
        correct: boolean;
    }
    questionText: {
        _key: string;
        _type: 'block';
        children: {
            _key: string;
            _type: string;
            marks: any[];
            text: string;
        };
        markDefs: any[];
        style: string;
    }
}