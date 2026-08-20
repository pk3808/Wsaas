const fs = require('fs');

let code = fs.readFileSync('src/components/templates/CelebrationCarnivalTemplate.tsx', 'utf8');

// I need to extract FloatingBalloon completely outside of CelebrationCarnivalTemplate.
// It seems it was placed inside `CelebrationCarnivalTemplate` by my regex replacement.

// Find FloatingBalloon definition
const balloonRegex = /const FloatingBalloon = \(\{ id, msg, delay, colorClass, isPopped, onPop, shouldReduceMotion \}: \{ id: number, msg: string, delay: number, colorClass: string, isPopped: boolean, onPop: \(id: number, rect: DOMRect\) => void, shouldReduceMotion: boolean \| null \}\) => \{[\s\S]+?  \};\n/m;
const match = code.match(balloonRegex);

if (match) {
    let balloonCode = match[0];
    code = code.replace(match[0], ''); // remove it from inside

    // Put it after Cursor
    const cursorEndRegex = /const Cursor = \(\) => \{[\s\S]+?  \);\n\};\n/m;
    code = code.replace(cursorEndRegex, match => match + '\n' + balloonCode + '\n');
}

fs.writeFileSync('src/components/templates/CelebrationCarnivalTemplate.tsx', code);
