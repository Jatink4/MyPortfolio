import React, { useState } from 'react';
import { evaluate, round, pi } from 'mathjs';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState('rad');

  const buttons = [
    '7', '8', '9', '/', '(',
    '4', '5', '6', '*', ')',
    '1', '2', '3', '-', '%',
    '0', '.', '+', '^', '√',
    'sin', 'cos', 'tan', 'log', 'ln',
    'π', 'C', '=', 'Del'
  ];

  const toRadians = (deg) => deg * (pi / 180);

  const handleClick = (val) => {
    if (val === 'C') {
      setExpression('');
      setResult('');
    } else if (val === 'Del') {
      setExpression(expression.slice(0, -1));
    } else if (val === '=') {
      try {
        let replaced = expression
          .replace(/π/g, 'pi')
          .replace(/√/g, 'sqrt')
          .replace(/log/g, 'log10')
          .replace(/ln/g, 'log');

        if (angleMode === 'deg') {
          replaced = replaced
            .replace(/sin\(([^)]+)\)/g, (_, angle) => `sin(${toRadians(evaluate(angle))})`)
            .replace(/cos\(([^)]+)\)/g, (_, angle) => `cos(${toRadians(evaluate(angle))})`)
            .replace(/tan\(([^)]+)\)/g, (_, angle) => `tan(${toRadians(evaluate(angle))})`);
        }

        const evalResult = evaluate(replaced);
        const roundedResult = round(evalResult, 8);
        setResult(roundedResult);
        setHistory(prev => [...prev, { exp: expression, res: roundedResult }]);
      } catch (err) {
        setResult('Error');
      }
    } else {
      setExpression(expression + val);
    }
  };

  return (
    <div className="p-4 my-10 w-full max-w-3xl mx-auto bg-gray-900 text-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">🧮 Scientific Calculator</h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">Angle Mode:</span>
          <button
            onClick={() => setAngleMode(angleMode === 'rad' ? 'deg' : 'rad')}
            className="px-2 py-1 bg-green-500 text-sm rounded"
          >
            {angleMode === 'rad' ? 'Radians' : 'Degrees'}
          </button>
        </div>
      </div>

      <div className="bg-gray-700 p-3 rounded mb-4">
        <div className="text-sm text-gray-300 break-words">{expression}</div>
        <div className="text-2xl font-bold text-right">{result}</div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-6 gap-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handleClick(btn)}
            className="bg-blue-600 hover:bg-blue-700 p-2 text-sm sm:text-base rounded"
          >
            {btn}
          </button>
        ))}
      </div>

      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg mb-2">🕓 History</h3>
            <button onClick={() => setHistory([])} className="text-red-400 text-sm">Clear</button>
          </div>
          <ul className="space-y-1 text-sm max-h-40 overflow-y-auto">
            {history.map((h, idx) => (
              <li key={idx} className="bg-gray-800 px-2 py-1 rounded">
                <span className="font-medium">{h.exp}</span> = <span>{h.res}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center text-xs text-gray-400 mt-4">⚠️ Results may vary — verify for accuracy.</div>
    </div>
  );
};

export default Calculator;
