export default {
  listLanguages: [
    {
      id: "46a6a526-c0b6-4c69-bdfd-6224bc513775",
      name: "Termina com aab",
      empty: true,
      valid: true,
      grammar: "Automato nao deterministico",
      expression: "",
      fsm: {
        states: ["S", "A", "B", "C"],
        alphabet: ["a", "b"],
        transitions: [
          {
            from: "S",
            to: "S,A",
            when: "a"
          },
          {
            from: "S",
            to: "S",
            when: "b"
          },
          {
            from: "A",
            to: "B",
            when: "a"
          },
          {
            from: "A",
            when: "b"
          },
          {
            from: "B",
            when: "a"
          },
          {
            from: "B",
            to: "C",
            when: "b"
          },
          {
            from: "C",
            when: "a"
          },
          {
            from: "C",
            when: "b"
          }
        ],
        initial: "S",
        finals: [false, false, false, true]
      },
      userSentences: [
        {
          sentence: "aab",
          valid: true
        },
        {
          sentence: "ababb",
          valid: false
        },
        {
          sentence: "abaab",
          valid: true
        }
      ],
      enumerationLength: 5
    },
    {
      id: "9d7979d6-f86b-45ea-8e7f-4d12802ac75a",
      name: "w1",
      empty: true,
      valid: true,
      grammar: "Automato nao deterministico",
      expression: "",
      fsm: {
        states: ["S", "A"],
        alphabet: ["0", "1"],
        transitions: [
          {
            from: "S",
            to: "S",
            when: "0"
          },
          {
            from: "S",
            to: "A,S",
            when: "1"
          },
          {
            from: "A",
            when: "0"
          },
          {
            from: "A",
            when: "1"
          }
        ],
        initial: "S",
        finals: [false, true]
      },
      userSentences: [
        {
          sentence: "01",
          valid: true
        },
        {
          sentence: "1001",
          valid: true
        },
        {
          sentence: "100010",
          valid: false
        }
      ],
      enumerationLength: 5
    },
    {
      id: "9c80aee9-05db-4bc0-a053-5bab9f4a3e51",
      name: "a par ou b impar",
      empty: true,
      valid: true,
      grammar: "Automato nao deterministico",
      expression: "",
      fsm: {
        states: ["S", "A", "B", "C", "D"],
        alphabet: ["a", "b", "&"],
        transitions: [
          {
            from: "S",
            when: "a"
          },
          {
            from: "S",
            when: "b"
          },
          {
            from: "S",
            to: "A,C",
            when: "&"
          },
          {
            from: "A",
            to: "B",
            when: "a"
          },
          {
            from: "A",
            to: "A",
            when: "b"
          },
          {
            from: "A",
            when: "&"
          },
          {
            from: "B",
            to: "A",
            when: "a"
          },
          {
            from: "B",
            to: "B",
            when: "b"
          },
          {
            from: "B",
            when: "&"
          },
          {
            from: "C",
            to: "C",
            when: "a"
          },
          {
            from: "C",
            to: "D",
            when: "b"
          },
          {
            from: "C",
            when: "&"
          },
          {
            from: "D",
            to: "D",
            when: "a"
          },
          {
            from: "D",
            to: "C",
            when: "b"
          },
          {
            from: "D",
            when: "&"
          }
        ],
        initial: "S",
        finals: [false, true, false, false, true]
      },
      userSentences: [
        {
          sentence: "a",
          valid: false
        },
        {
          sentence: "aa",
          valid: true
        },
        {
          sentence: "b",
          valid: true
        },
        {
          sentence: "bb",
          valid: true
        }
      ],
      enumerationLength: 5
    },
    {
      id: "17b2d4e9-2073-44c6-9b88-59dc5879f442",
      name: "bin div por 6",
      empty: true,
      valid: true,
      grammar:
        "A -> 0A | 1B | 0\nB -> 0C | 1D \nC -> 0B | 1C\nD -> 0A | 1B | 0",
      expression: "",
      fsm: {
        states: ["A", "B", "C", "D", "#"],
        alphabet: ["0", "1"],
        transitions: [
          {
            from: "A",
            to: "#,A",
            when: "0"
          },
          {
            from: "A",
            to: "B",
            when: "1"
          },
          {
            from: "B",
            to: "C",
            when: "0"
          },
          {
            from: "B",
            to: "D",
            when: "1"
          },
          {
            from: "C",
            to: "B",
            when: "0"
          },
          {
            from: "C",
            to: "C",
            when: "1"
          },
          {
            from: "D",
            to: "#,A",
            when: "0"
          },
          {
            from: "D",
            to: "B",
            when: "1"
          }
        ],
        initial: "A",
        finals: [false, false, false, false, true]
      },
      userSentences: [
        {
          sentence: "110",
          valid: true
        },
        {
          sentence: "111",
          valid: false
        },
        {
          sentence: "1100",
          valid: true
        },
        {
          sentence: "1101",
          valid: false
        }
      ],
      enumerationLength: 5
    },
    {
      id: "fc76341c-b849-4aa3-bbf2-866b57b09dba",
      name: "a^n(b,c)* n>=0 |w| impar, w sem b`s e c`s consecutivos",
      empty: true,
      valid: true,
      grammar:
        "A -> aB | a\nB -> aA | bC | cD\nC -> cE | c\nD -> bF | b\nE -> bC\nF -> cD",
      expression: "",
      fsm: {
        states: ["A", "B", "C", "D", "E", "F", "#"],
        alphabet: ["a", "b", "c"],
        transitions: [
          {
            from: "A",
            to: "#,B",
            when: "a"
          },
          {
            from: "B",
            to: "A",
            when: "a"
          },
          {
            from: "B",
            to: "C",
            when: "b"
          },
          {
            from: "B",
            to: "D",
            when: "c"
          },
          {
            from: "C",
            to: "#,E",
            when: "c"
          },
          {
            from: "D",
            to: "#,F",
            when: "b"
          },
          {
            from: "E",
            to: "C",
            when: "b"
          },
          {
            from: "F",
            to: "D",
            when: "c"
          }
        ],
        initial: "A",
        finals: [false, false, false, false, false, false, true]
      },
      userSentences: [
        {
          sentence: "a",
          valid: true
        },
        {
          sentence: "aa",
          valid: false
        },
        {
          sentence: "aaa",
          valid: true
        },
        {
          sentence: "abb",
          valid: false
        }
      ],
      enumerationLength: 5
    },
    {
      id: "82e4bc67-fa37-4002-8867-ac9e5870d45e",
      name: "a^n b^m c^k | n>=0, m>=1, k>=2",
      empty: true,
      valid: true,
      grammar: "A -> aA | bB\nB -> bB | cC\nC -> cC | c",
      expression: "",
      fsm: {
        states: ["A", "B", "C", "#"],
        alphabet: ["a", "b", "c"],
        transitions: [
          {
            from: "A",
            to: "A",
            when: "a"
          },
          {
            from: "A",
            to: "B",
            when: "b"
          },
          {
            from: "B",
            to: "B",
            when: "b"
          },
          {
            from: "B",
            to: "C",
            when: "c"
          },
          {
            from: "C",
            to: "#,C",
            when: "c"
          }
        ],
        initial: "A",
        finals: [false, false, false, true]
      },
      userSentences: [
        {
          sentence: "abcc",
          valid: true
        },
        {
          sentence: "abcccc",
          valid: true
        },
        {
          sentence: "bcc",
          valid: true
        },
        {
          sentence: "c",
          valid: false
        }
      ],
      enumerationLength: 5
    },
    {
      id: "f824916f-493c-43a0-ba06-81edd2e565db",
      name: "(a`s + b`s) % 3 == 0",
      empty: true,
      valid: true,
      grammar:
        "S -> aB | bB | &\nB -> aC | bC\nC -> aD | bD | a | b\nD -> aB | bB",
      expression: "",
      fsm: {
        states: ["S", "B", "C", "D", "#"],
        alphabet: ["a", "b"],
        transitions: [
          {
            from: "S",
            to: "B",
            when: "a"
          },
          {
            from: "S",
            to: "B",
            when: "b"
          },
          {
            from: "B",
            to: "C",
            when: "a"
          },
          {
            from: "B",
            to: "C",
            when: "b"
          },
          {
            from: "C",
            to: "#,D",
            when: "a"
          },
          {
            from: "C",
            to: "#,D",
            when: "b"
          },
          {
            from: "D",
            to: "B",
            when: "a"
          },
          {
            from: "D",
            to: "B",
            when: "b"
          }
        ],
        initial: "S",
        finals: [true, false, false, false, true]
      },
      userSentences: [
        {
          sentence: "aba",
          valid: true
        },
        {
          sentence: "abab",
          valid: false
        },
        {
          sentence: "aaa",
          valid: true
        },
        {
          sentence: "bab",
          valid: true
        },
        {
          sentence: "abbb",
          valid: false
        }
      ],
      enumerationLength: 5
    }
  ],
  selectedLanguage: 6
};
