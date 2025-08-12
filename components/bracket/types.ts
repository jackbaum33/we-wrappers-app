export type Friend = { id: string; name: string };
export type Bracket = {
  id: string;
  name: string;
  participants: Friend[];
  rounds: Friend[][]; // simple bracket data: array of rounds, each round is array of “match owners”
};
