const fs = require('fs');

let code = fs.readFileSync('src/components/templates/CelebrationCarnivalTemplate.tsx', 'utf8');

// Move FloatingBalloon out of CelebrationCarnivalTemplate
const balloonRegex = /const FloatingBalloon = \({ id, msg, delay, colorClass }[^]+?    \);[\s]+};/m;
const match = code.match(balloonRegex);

if (match) {
    let balloonCode = match[0];
    code = code.replace(match[0], '');

    // update FloatingBalloon definition to accept poppedBalloons state
    balloonCode = balloonCode.replace(
        `const FloatingBalloon = ({ id, msg, delay, colorClass }: { id: number, msg: string, delay: number, colorClass: string }) => {`,
        `const FloatingBalloon = ({ id, msg, delay, colorClass, isPopped, onPop, shouldReduceMotion }: { id: number, msg: string, delay: number, colorClass: string, isPopped: boolean, onPop: (id: number, rect: DOMRect) => void, shouldReduceMotion: boolean | null }) => {`
    );

    balloonCode = balloonCode.replace(
        `const isPopped = poppedBalloons.includes(id);`,
        ``
    );

    balloonCode = balloonCode.replace(
        `triggerConfetti("small", (rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);\n          setPoppedBalloons(prev => [...prev, id]);`,
        `onPop(id, rect);`
    );

    code = code.replace('// --- Components ---', '// --- Components ---\n' + balloonCode);

    // update uses of FloatingBalloon
    code = code.replace(/<FloatingBalloon id=\{([0-9])\} msg=(.*?) delay=\{([0-9.]+)\} colorClass="(.*?)" \/>/g, '<FloatingBalloon id={$1} msg=$2 delay={$3} colorClass="$4" isPopped={poppedBalloons.includes($1)} onPop={(id, rect) => { triggerConfetti("small", (rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight); setPoppedBalloons(prev => [...prev, id]); }} shouldReduceMotion={shouldReduceMotion} />');
}

// Fix Math.random() in wish explosion
code = code.replace(
`                            y: -200 - (Math.random() * 200),
                            x: (Math.random() - 0.5) * 400`,
`                            y: -200 - ((i * 47) % 200),
                            x: ((i * 113 % 400) - 200)`
);

// Fix anys
code = code.replace(/mem: any/g, 'mem: { text: string }');
code = code.replace(/msg: any/g, 'msg: { message: string, sender: string, relationship: string }');
code = code.replace(/fallback: any/g, 'fallback: unknown');


fs.writeFileSync('src/components/templates/CelebrationCarnivalTemplate.tsx', code);
