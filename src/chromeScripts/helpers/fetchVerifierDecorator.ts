import FetchInitConditionsChecker from "./fetchInitConditionsChecker";

export default function fetchVerifierDecorator(
  _target: unknown,
  _name: string,
  descriptor: PropertyDescriptor,
) : void {
  const method = descriptor.value; // references the method being decorated

  // eslint-disable-next-line no-param-reassign
  descriptor.value = async function (...args: any[]): Promise<void> {
    const extensionStateVerifier = new FetchInitConditionsChecker();

    // Perform verification
    let verificationResult = true;
    verificationResult = extensionStateVerifier.isFetchMessageReceived(verificationResult, args[0]);
    verificationResult = extensionStateVerifier.isAllowedDistance(verificationResult, args[0]);
    verificationResult = await extensionStateVerifier.isNotPendingRequest(verificationResult);
    verificationResult = extensionStateVerifier.isUserIdValid(verificationResult, args[0]);
    verificationResult = await extensionStateVerifier.resultExist(verificationResult);

    if (!verificationResult) return; // exit the function if verification doesn't pass

    method.apply(this, args); // run original method
  };
}
