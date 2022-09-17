import { useState } from 'react';

import { FormControl, HStack, Input, Button, IconButton, Select } from '@chakra-ui/react';
import { BsArrowLeftRight } from 'react-icons/bs';

function Form({setSourceCurrency, setTargetCurrency, setAmount} : any) {
  const [sourceCurrencyForm, setSourceCurrencyForm] = useState('USD');
  const [targetCurrencyForm, setTargetCurrencyForm] = useState('EUR');
  const [amountForm, setAmountForm] = useState(null);

  function handleSourceFormChange(e: any) {
    setSourceCurrencyForm(e.target.value);
  }

  function handleTargetFormChange(e: any) {
    setTargetCurrencyForm(e.target.value);
  }

  function handleAmountFormChange(e: any) {
    setAmountForm(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('submit', sourceCurrencyForm, targetCurrencyForm, amountForm);
    setSourceCurrency(sourceCurrencyForm);
    setTargetCurrency(targetCurrencyForm);
    setAmount(amountForm);
  }

  function handleSwitch() {
    setSourceCurrencyForm(targetCurrencyForm);
    setTargetCurrencyForm(sourceCurrencyForm);
  }

  return (
    <FormControl mt={3} onSubmit={handleSubmit}>
      <HStack mx={'auto'} h={'fit'} w="80%">
        <Select 
          size='sm' 
          onChange={handleSourceFormChange} 
          value={sourceCurrencyForm}
          border='2px' 
          borderColor={'teal.500'} 
          borderRadius={8}
          _hover={{borderColor: 'teal.300'}}
          _active={{borderColor: 'teal.300'}}
          _focus={{borderColor: 'teal.300'}}
        >
        {
          ['USD', 'EUR', 'IDR', 'JPY', 'CNY', 'SGD']
          .map((cur) => (<option value={cur}>{cur}</option>))
        }
        </Select>
        <IconButton icon={<BsArrowLeftRight opacity={0.8} size={25} />} aria-label="switch curency" bg="transparent" onClick={handleSwitch} p={0}></IconButton>
        <Select 
          size='sm' 
          onChange={handleTargetFormChange} 
          value={targetCurrencyForm}
          border='2px' 
          borderColor={'teal.500'} 
          borderRadius={8}
          _hover={{borderColor: 'teal.300'}}
          _active={{borderColor: 'teal.300'}}
          _focus={{borderColor: 'teal.300'}}
        >
        {
          ['USD', 'EUR', 'IDR', 'JPY', 'CNY', 'SGD']
          .map((cur) => (<option value={cur}>{cur}</option>))
        }
        </Select>
      </HStack>
      <HStack w={"80%"} mx={'auto'} mt={2}>
        <Input 
          size='sm' 
          onChange={handleAmountFormChange} 
          value={amountForm ? amountForm : ""} 
          variant="flushed" px={4} 
          placeholder="Amount" 
          bg="transparent" 
          borderBottom="2px" 
          borderBottomColor={'teal.500'} 
          mr={3}
          _hover={{borderBottomColor: 'teal.300'}}
          _active={{borderColor: 'teal.300'}}
          _focus={{borderColor: 'teal.300'}}
          _after={{bg: 'transparent'}} 
          _selected={{bg: 'transparent'}}
          _selection={{bg: 'transparent'}}
        />
        <Button size={'sm'} fontSize={12} bg="teal.500" h={7} w="30%" _hover={{bg: "teal.600"}} onClick={handleSubmit}>Convert</Button>
      </HStack>
    </FormControl>
  );
}

export default Form;