
export default {
        listLanguages: [
            {
                id: '46a6a526-c0b6-4c69-bdfd-6224bc513775',
                name: 'Termina com aab',
                empty: true,
                valid: true,
                grammar: 'Automato nao deterministico',
                expression: '',
                fsm: {
                    states: [
                        'S',
                        'A',
                        'B',
                        'C'
                    ],
                    alphabet: [
                        'a',
                        'b'
                    ],
                    transitions: [
                        {
                            from: 'S',
                            to: 'S,A',
                            when: 'a'
                        },
                        {
                            from: 'S',
                            to: 'S',
                            when: 'b'
                        },
                        {
                            from: 'A',
                            to: 'B',
                            when: 'a'
                        },
                        {
                            from: 'A',
                            when: 'b'
                        },
                        {
                            from: 'B',
                            when: 'a'
                        },
                        {
                            from: 'B',
                            to: 'C',
                            when: 'b'
                        },
                        {
                            from: 'C',
                            when: 'a'
                        },
                        {
                            from: 'C',
                            when: 'b'
                        }
                    ],
                    initial: 'S',
                    finals: [
                        false,
                        false,
                        false,
                        true
                    ]
                },
                userSentences: [
                    {
                        sentence: 'aab',
                        valid: true
                    },
                    {
                        sentence: 'ababb',
                        valid: false
                    },
                    {
                        sentence: 'abaab',
                        valid: true
                    }
                ],
                enumerationLength: 5
            },
            {
                id: '9d7979d6-f86b-45ea-8e7f-4d12802ac75a',
                name: 'w1',
                empty: true,
                valid: true,
                grammar: 'Automato nao deterministico',
                expression: '',
                fsm: {
                    states: [
                        'S',
                        'A'
                    ],
                    alphabet: [
                        '0',
                        '1'
                    ],
                    transitions: [
                        {
                            from: 'S',
                            to: 'S',
                            when: '0'
                        },
                        {
                            from: 'S',
                            to: 'A,S',
                            when: '1'
                        },
                        {
                            from: 'A',
                            when: '0'
                        },
                        {
                            from: 'A',
                            when: '1'
                        }
                    ],
                    initial: 'S',
                    finals: [
                        false,
                        true
                    ]
                },
                userSentences: [
                    {
                        sentence: '01',
                        valid: true
                    },
                    {
                        sentence: '1001',
                        valid: true
                    },
                    {
                        sentence: '100010',
                        valid: false
                    }
                ],
                enumerationLength: 5
            },
            {
                id: '9c80aee9-05db-4bc0-a053-5bab9f4a3e51',
                name: 'a par ou b impar',
                empty: true,
                valid: true,
                grammar: 'Automato nao deterministico',
                expression: '',
                fsm: {
                    states: [
                        'S',
                        'A',
                        'B',
                        'C',
                        'D'
                    ],
                    alphabet: [
                        'a',
                        'b',
                        '&'
                    ],
                    transitions: [
                        {
                            from: 'S',
                            when: 'a'
                        },
                        {
                            from: 'S',
                            when: 'b'
                        },
                        {
                            from: 'S',
                            to: 'A,C',
                            when: '&'
                        },
                        {
                            from: 'A',
                            to: 'B',
                            when: 'a'
                        },
                        {
                            from: 'A',
                            to: 'A',
                            when: 'b'
                        },
                        {
                            from: 'A',
                            when: '&'
                        },
                        {
                            from: 'B',
                            to: 'A',
                            when: 'a'
                        },
                        {
                            from: 'B',
                            to: 'B',
                            when: 'b'
                        },
                        {
                            from: 'B',
                            when: '&'
                        },
                        {
                            from: 'C',
                            to: 'C',
                            when: 'a'
                        },
                        {
                            from: 'C',
                            to: 'D',
                            when: 'b'
                        },
                        {
                            from: 'C',
                            when: '&'
                        },
                        {
                            from: 'D',
                            to: 'D',
                            when: 'a'
                        },
                        {
                            from: 'D',
                            to: 'C',
                            when: 'b'
                        },
                        {
                            from: 'D',
                            when: '&'
                        }
                    ],
                    initial: 'S',
                    finals: [
                        false,
                        true,
                        false,
                        false,
                        true
                    ]
                },
                userSentences: [
                    {
                        sentence: 'a',
                        valid: false
                    },
                    {
                        sentence: 'aa',
                        valid: true
                    },
                    {
                        sentence: 'b',
                        valid: true
                    },
                    {
                        sentence: 'bb',
                        valid: true
                    }
                ],
                enumerationLength: 5
            }
        ],
        selectedLanguage: 2
}