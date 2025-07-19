// Calculator.jsx
import React, { useState } from 'react';
import { evaluate, round, sin, cos, tan, pi } from 'mathjs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState('rad');
  const [graphData, setGraphData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  const buttons = [
    '7','8','9','/','(',
    '4','5','6','*',')',
    '1','2','3','-','%',
    '0','.','+','^','√',
    'sin','cos','tan','log','ln',
    'π','x','C','=','Del', 'Graph'
  ];

  const toRadians = (deg) => deg * (pi / 180);

  const handleClick = (val) => {
    if (val === 'C') {
      setExpression('');
      setResult('');
      setGraphData([]);
      setShowGraph(false);
    } else if (val === 'Del') {
      setExpression(expression.slice(0, -1));
    } else if (val === '=') {
      try {
        let replaced = expression
          .replace(/(\d)x/g, '$1*x')
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

        setGraphData([]);
        setShowGraph(false);
      } catch (err) {
        setResult('Error');
      }
    } else if (val === 'Graph') {
      try {
        let replaced = expression
          .replace(/(\d)x/g, '$1*x')
          .replace(/π/g, 'pi')
          .replace(/√/g, 'sqrt')
          .replace(/log/g, 'log10')
          .replace(/ln/g, 'log');

        const data = [];
        for (let x = -10; x <= 10; x += 0.5) {
          try {
            let yExpr = replaced.replace(/x/g, `(${x})`);
            if (angleMode === 'deg') {
              yExpr = yExpr
                .replace(/sin\(([^)]+)\)/g, (_, angle) => `sin(${toRadians(evaluate(angle))})`)
                .replace(/cos\(([^)]+)\)/g, (_, angle) => `cos(${toRadians(evaluate(angle))})`)
                .replace(/tan\(([^)]+)\)/g, (_, angle) => `tan(${toRadians(evaluate(angle))})`);
            }
            const y = evaluate(yExpr);
            if (!isNaN(y)) data.push({ x, y });
          } catch {}
        }
        setGraphData(data);
        setShowGraph(true);
      } catch (err) {
        setResult('Error');
      }
    } else {
      setExpression(expression + val);
    }
  };

  return (
    <div className="p-4 my-10 w-full mx-auto bg-gray-900 text-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold text-center mb-4">🧮 Scientific Calculator</h2>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">Angle Mode:</span>
        <button
          onClick={() => setAngleMode(angleMode === 'rad' ? 'deg' : 'rad')}
          className="px-2 py-1 bg-green-500 text-white text-sm rounded"
        >
          {angleMode === 'rad' ? 'Radians' : 'Degrees'}
        </button>
        {graphData.length > 0 && (
          <button
            onClick={() => setShowGraph(!showGraph)}
            className="px-2 py-1 bg-purple-500 text-white text-sm rounded"
          >
            {showGraph ? 'Hide Graph' : 'Show Graph'}
          </button>
        )}
      </div>
      <div className="bg-gray-700 p-2 rounded mb-2">
        <div className="text-sm text-gray-300 break-all">{expression}</div>
        <div className="text-xl font-bold text-right">{result}</div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handleClick(btn)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {btn}
          </button>
        ))}
      </div>
      {showGraph && graphData.length > 0 && (
        <div className="mt-6 h-64 bg-white text-black border rounded p-2">
          <h3 className="font-semibold text-lg mb-2">📈 Graph</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {history.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg mb-2">History</h3>
            <button onClick={() => setHistory([])} className="text-red-500 text-sm">Clear All</button>
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
      <div className='text-gray-500 text-sm text-center'>It Can be wrong</div>
    </div>
  );
};

export default Calculator;
