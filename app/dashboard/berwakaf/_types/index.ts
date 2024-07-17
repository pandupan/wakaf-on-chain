export interface FormTypes {
  step1: {
    amount: number;
  };
  step2: {
    paymentMethodId: null | string;
    paymentMethodLabel: null | string;
  };
  step3: {
    name: string;
    email: string;
    isHiddenName: boolean;
    message: string;
  }
}