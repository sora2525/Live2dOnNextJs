import { CharacterType, MessageType } from './types'

export const TestMessages: MessageType[] = Array.from({ length: 10 }, () => [
    { type: 'question', text: 'テスト質問' },
    { type: 'answer', text: 'テスト回答1\nテスト回答2\nテスト回答3' },
  ]).flat()


// VOICEVOXのキャラクター
// https://voicevox.hiroshiba.jp/
export const Characters: CharacterType[] = [
 
  { value: '58', label: '猫使ビィ', word: 'ねこつかびぃです' },
]