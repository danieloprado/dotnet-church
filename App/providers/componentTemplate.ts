module Providers {

    export class ComponentTemplate {
        static $inject = ["lodash"];

        constructor(private lodash: _.LoDashStatic) {
        }

        private resolveParams(resolveItems: Object): string {
            if (!resolveItems) return "";

            return Object.keys(resolveItems).reduce((acc, key) => {
                acc.push(`${this.lodash.kebabCase(key)}="${key}"`);
                return acc;
            }, []).join(" ");
        };

        resolve(componentName: string, data: Object): string {
            return `<${this.lodash.kebabCase(componentName)} ${this.resolveParams(data)} cancel="cancel($data)" complete="complete($data)" />`;
        }
    }

    angular.module("app").service("ComponentTemplate", ComponentTemplate);


}