const Category = {
  Action: '3f591c18-bb78-4e5b-8fe4-e5ec55a9c1b4',
  Indie: 'a21a59de-50b3-4a59-be3e-2a687afc5407',
  Strategy: '152689d4-4a83-4698-9ca1-66c6f0960fde',
  RPG: '93c57e6a-77a1-4c9f-8cb4-cd08dc271d3b',
  Simulation: '71e42bdc-a8c7-4bc0-99cb-30d5d3721f3e',
  Racing: 'bc60445f-27c6-4b90-ada6-56c57c6ace55',
  Casual: '3a403652-ca05-444d-b401-8ed1b4ca7535',
  Adventure: '1da26eb5-deb1-4164-a95a-be7c7a3038f9',
  Sports: '9e0f0f0f-059a-40ee-8ca2-3450a5b624a3',
  FreeToPlay: '93b81d51-5d1d-45fb-b6bd-c09bf05c5cf6',
  'Massively Multiplayer': 'dc25537f-197b-47d4-9709-a226feacca72',
  'Early Access': '3da0cd2b-b831-4aa7-b51d-bc5258f2e84f',
  Education: '9deac618-e323-447b-86dc-27a156145e51',
  'Software Training': '3d7fba79-f869-4848-b06b-a321d2011403',
  'Animation Modeling': '59caa7f7-ce42-4ee1-a7cd-4be85696c78b',
  'Design Illustration': '432b9934-fed9-4858-a940-e89152e75f65',
  Utilities: '64435e1b-2d98-41ae-939a-467889fe2b43',
  'Audio Production': '8357bf0c-45d6-484f-93bd-8e59a6b912e4',
  'Video Production': 'e00ba223-f755-4361-a94b-b224c33817ca',
  'Web Publishing': 'ded52f2e-0d4d-4015-bbde-70c0142c61f0',
  'Photo Editing': 'c1dbe964-d17a-4600-b63c-3a69a095668a',
  'Game Development': 'a9cc3fa6-30c8-401b-9bdd-b5c630b981d6',
  Accounting: 'b86528fd-5351-4249-9248-f4c8de4a225e',
};

const entireCategory = Object.entries(Category);

export function getCategoryNameById(id: string) {
  for (const [key, value] of entireCategory) {
    if (value === id) {
      return key;
    }
  }
  return null;
}

export function getCategoryIdByName(name: string) {
  for (const [key, value] of entireCategory) {
    if (key === name) {
      return value;
    }
  }
  return null;
}
