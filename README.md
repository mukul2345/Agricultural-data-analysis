# Agricultural Data Analysis Project

This project involves performing analytics on the Indian Agriculture dataset provided by the National Data and Analytics Platform, NITI Aayog. The analysis results will be displayed as tables using Mantine v7.

## Documentation

For more information about Mantine and its integration with Vanilla Extract, please refer to the [Mantine Documentation](https://mantine.dev/styles/vanilla-extract/).

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mukul2345/Agricultural-data-analysis
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd Agricultural-data-analysis
   ```

3. **Install Dependencies:**
   ```bash
   yarn install
   ```

4. **Start the Development Server:**
   ```bash
   yarn dev
   ```

5. **Access the Application:**
   Follow the URL provided in the terminal to view the application in your browser.

## Assignment Steps

### Objective

Perform analytics on the provided Indian Agriculture dataset and display the results as tables. 

### Implementation Steps

1. **Data Parsing:**
   - Parse the JSON data to extract relevant fields: year, crop name, production, yield, and cultivation area.
   - Treat missing values as 0.

2. **Yearly Data Aggregation:**
   - Aggregate the data to find the crop with maximum and minimum production for each year.
   - Store the results in an array of objects with fields for year, maxCrop, and minCrop.

3. **Crop Data Aggregation:**
   - Aggregate the data to calculate the average yield and average cultivation area for each crop over the years.
   - Store the results in an array of objects with fields for crop, avgYield, and avgArea.

4. **Render Tables:**
   - Use Mantine's Table component to render two tables:
     - Yearly Crop Data: displaying year, crop with maximum production, and crop with minimum production.
     - Crop Average Data: displaying crop, average yield, and average cultivation area.

5. **Styling:**
   - Apply CSS styles to the tables and container for better presentation.

### Example Code Outline

```typescript
import React, { useEffect, useState } from 'react';
import data from '../JsonData/Manufac_Data.json';
import { Table } from '@mantine/core';

const Crops: React.FC = () => {
  // State for storing aggregated data
  const [yearlyData, setYearlyData] = useState([]);
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    // Parse and aggregate data
    const parsedData = parseData(data);
    setYearlyData(aggregateYearlyData(parsedData));
    setCropData(aggregateCropData(parsedData));
  }, []);

  // Function to parse data
  const parseData = (data) => { /* parsing logic */ };
  // Function to aggregate yearly data
  const aggregateYearlyData = (data) => { /* aggregation logic */ };
  // Function to aggregate crop data
  const aggregateCropData = (data) => { /* aggregation logic */ };

  return (
    <div>
      {/* Render tables */}
    </div>
  );
};

export default Crops;
```
