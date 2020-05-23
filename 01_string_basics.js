// ========== STRING METHODS ==========

// indexOf - search inside string. Returns index of first occurrence of specified value

let tvShow = 'catdog';

tvShow.indexOf('cat'); // 0
tvShow.indexOf('dog'); // 3
tvShow.indexOf('z'); // -1 (not found)

'baseball'.indexOf('b'); // 0 (returns only first instance of 'b')

// slice - get some part of a string. Extracts a section of a string and returns it as a new string, without modifying the original string

let str = 'supercalifragilisticexpialidocious';

str.slice(0, 5); // 'super'
str.slice(5); // 'califragilisticexpialidocious'
str.slice(200); // '' -

str = 'catdog2';
str.slice(3, -1); // 'dog' - returns string from index 3 to last index minus one

// replace - replace something to something other inside a string. Returns a new string with first match of a pattern replaced by a replacement. Can replace all by using regexp.

let annoyingLaugh = 'teehee so funny! teehee';

annoyingLaugh.replace('teehee', 'haha'); // 'haha so funny! teehee' - replaces the first instance only

'GARBAGE!'.slice(2).replace('B', ''); // 'GARBAGE!' -> 'RBAGE!' -> 'RAGE!' ('B' replaced with empty string)

// trim - delete spaces at start and end of string. Removes whitespace from both ends of a string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).

let greeting = '  meow meow meow            ';
greeting.trim(); // 'meow meow meow'

// ========== STRING ESCAPE CHARACTERS ==========
// \n - new line
// \' - single quote
// \" - double quote
// \\ - backslash
