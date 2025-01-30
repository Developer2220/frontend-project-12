import LeoProfanity from 'leo-profanity';

const addWords = () => {
  LeoProfanity.list();
  LeoProfanity.clearList();
  LeoProfanity.add(LeoProfanity.getDictionary('en'));
  LeoProfanity.add(LeoProfanity.getDictionary('fr'));
  LeoProfanity.add(LeoProfanity.getDictionary('ru'));
  LeoProfanity.list();
};

export default addWords;
