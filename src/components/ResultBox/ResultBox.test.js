import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component Result Box', () => {
  const testCases = [
    {
      amount: 100,
      resultPlnToUsd: 'PLN 100.00 = $28.57',
      resultUsdToPln: '$100.00 = PLN 350.00',
      resultUsdToUsd: '$100.00 = $100.00',
      resultPlnToPln: 'PLN 100.00 = PLN 100.00',
    },
    {
      amount: 75,
      resultPlnToUsd: 'PLN 75.00 = $21.43',
      resultUsdToPln: '$75.00 = PLN 262.50',
      resultUsdToUsd: '$75.00 = $75.00',
      resultPlnToPln: 'PLN 75.00 = PLN 75.00',
    },
    {
      amount: 50,
      resultPlnToUsd: 'PLN 50.00 = $14.29',
      resultUsdToPln: '$50.00 = PLN 175',
      resultUsdToUsd: '$50.00 = $50.00',
      resultPlnToPln: 'PLN 50.00 = PLN 50.00',
    },
    {
      amount: 25,
      resultPlnToUsd: 'PLN 25.00 = $7.14',
      resultUsdToPln: '$25.00 = PLN 87.50',
      resultUsdToUsd: '$25.00 = $25.00',
      resultPlnToPln: 'PLN 25.00 = PLN 25.00',
    },
  ];
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  for (const testObjPLNUSD of testCases) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from='PLN' to='USD' amount={testObjPLNUSD.amount} />);

      const output = screen.getByTestId('resultBox');

      expect(output).toHaveTextContent(testObjPLNUSD.resultPlnToUsd);
    });
    cleanup();
  }
  for (const testObjUSDPLN of testCases) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from='USD' to='PLN' amount={testObjUSDPLN.amount} />);

      const output = screen.getByTestId('resultBox');

      expect(output).toHaveTextContent(testObjUSDPLN.resultUsdToPln);
    });
    cleanup();
  }
  for (const testObjUSDUSD of testCases) {
    it('should render proper info about conversion when USD -> USD', () => {
      render(<ResultBox from='USD' to='USD' amount={testObjUSDUSD.amount} />);

      const output = screen.getByTestId('resultBox');

      expect(output).toHaveTextContent(testObjUSDUSD.resultUsdToUsd);
    });
    cleanup();
  }
  for (const testObjPLNPLN of testCases) {
    it('should render proper info about conversion when PLN -> PLN', () => {
      render(<ResultBox from='PLN' to='PLN' amount={testObjPLNPLN.amount} />);

      const output = screen.getByTestId('resultBox');

      expect(output).toHaveTextContent(testObjPLNPLN.resultPlnToPln);
    });
    cleanup();
  }
  it('should render proper info about conversion when number is negative', () => {
    render(<ResultBox from='PLN' to='PLN' amount={-1} />);

    const output = screen.getByTestId('resultBox');

    expect(output).toHaveTextContent('Wrong value...');
  });
});
