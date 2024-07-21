import React, { useEffect, useState } from 'react';
import data from '../JsonData/Manufac_IndiaAgroDataset.json';
import { Table } from '@mantine/core';

interface CropData {
  Year: string;
  CropName: string;
  CropProduction: number;
  YieldOfCrops: number;
  AreaUnderCultivation: number;
}

interface YearlyAggregation {
  year: string;
  maxCrop: string;
  minCrop: string;
}

interface CropAggregation {
  crop: string;
  avgYield: number;
  avgArea: number;
}

const Crops: React.FC = () => {
  const [yearlyData, setYearlyData] = useState<YearlyAggregation[]>([]);
  const [cropData, setCropData] = useState<CropAggregation[]>([]);

  useEffect(() => {
    const parsedData: CropData[] = data.map((d: any) => ({
      Year: d["Year"].match(/\d{4}/)[0],
      CropName: d["Crop Name"],
      CropProduction: d["Crop Production (UOM:t(Tonnes))"] ? parseFloat(d["Crop Production (UOM:t(Tonnes))"]) : 0,
      YieldOfCrops: d["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] ? parseFloat(d["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) : 0,
      AreaUnderCultivation: d["Area Under Cultivation (UOM:Ha(Hectares))"] ? parseFloat(d["Area Under Cultivation (UOM:Ha(Hectares))"]) : 0,
    }));

    const yearAggregation = aggregateYearlyData(parsedData);
    const cropAggregation = aggregateCropData(parsedData);

    setYearlyData(yearAggregation);
    setCropData(cropAggregation);
  }, []);

  const aggregateYearlyData = (data: CropData[]): YearlyAggregation[] => {
    const yearMap: { [key: string]: { maxCrop: string; maxProduction: number; minCrop: string; minProduction: number } } = {};

    data.forEach(d => {
      if (!yearMap[d.Year]) {
        yearMap[d.Year] = { maxCrop: d.CropName, maxProduction: d.CropProduction, minCrop: d.CropName, minProduction: d.CropProduction };
      } else {
        if (d.CropProduction > yearMap[d.Year].maxProduction) {
          yearMap[d.Year].maxCrop = d.CropName;
          yearMap[d.Year].maxProduction = d.CropProduction;
        }
        if (d.CropProduction < yearMap[d.Year].minProduction) {
          yearMap[d.Year].minCrop = d.CropName;
          yearMap[d.Year].minProduction = d.CropProduction;
        }
      }
    });

    return Object.keys(yearMap).map(year => ({
      year,
      maxCrop: yearMap[year].maxCrop,
      minCrop: yearMap[year].minCrop
    }));
  };

  const aggregateCropData = (data: CropData[]): CropAggregation[] => {
    const cropMap: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

    data.forEach(d => {
      if (!cropMap[d.CropName]) {
        cropMap[d.CropName] = { totalYield: d.YieldOfCrops, totalArea: d.AreaUnderCultivation, count: 1 };
      } else {
        cropMap[d.CropName].totalYield += d.YieldOfCrops;
        cropMap[d.CropName].totalArea += d.AreaUnderCultivation;
        cropMap[d.CropName].count += 1;
      }
    });

    return Object.keys(cropMap).map(crop => ({
      crop,
      avgYield: cropMap[crop].totalYield / cropMap[crop].count,
      avgArea: cropMap[crop].totalArea / cropMap[crop].count
    }));
  };

  const tableStyles = {
    borderCollapse: 'collapse',
    width: '100%',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9'
  };

  const thStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left'
  };

  const tdStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
  };

  const containerStyles = {
    padding: '200px',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyles = {
    color: '#333',
    textAlign: 'center',
    margin: '20px 0'
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Yearly Crop Data</h1>

      <Table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Year</th>
            <th style={thStyles}>Crop with Maximum Production</th>
            <th style={thStyles}>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>{yearlyData.map((row, index) => (
          <tr key={index}>
            <td style={tdStyles}>{row.year}</td>
            <td style={tdStyles}>{row.maxCrop}</td>
            <td style={tdStyles}>{row.minCrop}</td>
          </tr>
        ))}</tbody>
      </Table>

      <h1 style={titleStyles}>Crop Average Data (1950-2020)</h1>

      <Table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Crop</th>
            <th style={thStyles}>Average Yield (Kg/Ha)</th>
            <th style={thStyles}>Average Cultivation Area (Ha)</th>
          </tr>
        </thead>
        <tbody>{cropData.map((row, index) => (
          <tr key={index}>
            <td style={tdStyles}>{row.crop}</td>
            <td style={tdStyles}>{row.avgYield.toFixed(2)}</td>
            <td style={tdStyles}>{row.avgArea.toFixed(2)}</td>
          </tr>
        ))}</tbody>
      </Table>
    </div>
  );
};

export default Crops;
