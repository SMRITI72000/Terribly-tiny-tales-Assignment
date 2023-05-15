import React, { useState } from 'react';
import * as d3 from 'd3';
import './FrequencyCounter.css';

function FrequencyCounter() {
  const [histogramData, setHistogramData] = useState(null);

  const fetchData = () => {
    fetch('https://www.terriblytinytales.com/test.txt')
      .then(response => response.text())
      .then(text => {
        const wordCounts = {};
        text.split(/\s+/).forEach(word => {
          word = word.toLowerCase().replace(/[^a-z]/g, '');
          if (!word) return;
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
        const topWords = Object.keys(wordCounts)
          .map(word => ({ word, count: wordCounts[word] }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 20);
        setHistogramData(topWords);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleExport = () => {
    const csvData = histogramData.map(({ word, count }) => `${word},${count}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "histogram.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderHistogram = () => {
    if (!histogramData) return null;
    const xScale = d3.scaleBand()
      .domain(histogramData.map(d => d.word))
      .range([0, 500])
      .padding(0.1);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(histogramData, d => d.count)])
      .range([300, 0]);
    const bars = histogramData.map(({ word, count }) => (
      <rect key={word} x={xScale(word)} y={yScale(count)} width={xScale.bandwidth()} height={300 - yScale(count)} />
    ));
    return (
      <svg className="histogram" width={600} height={400}>
        <g transform="translate(50, 50)">
          <g className="x-axis" transform="translate(0, 300)" ref={node => d3.select(node).call(d3.axisBottom(xScale))} />
          <g className="y-axis" ref={node => d3.select(node).call(d3.axisLeft(yScale))} />
          {bars}
        </g>
      </svg>
    );
  };

  return (
    <div className="container">
      <h1 className="heading">Frequency Counter</h1>
      <button className="submit-button" onClick={fetchData}>Submit</button>
      {renderHistogram()}
      {histogramData && <button className="export-button" onClick={handleExport}>Export</button>}
    </div>
  );
}

export default FrequencyCounter;
