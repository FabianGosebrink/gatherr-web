export function mockClass(service, methods) {
  const mockedClass = class MockedClass {};

  methods.forEach((method) => (mockedClass.prototype[method] = () => {}));

  return { provide: service, useClass: mockedClass };
}
