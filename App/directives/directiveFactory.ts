module Helpers {

    export function directiveFacotry(directive: any) {
        const result = directive.$inject;
        result.push(function () {

            let params: Array<string> = [];
            for (let a = 0; a < arguments.length; a++) {
                params.push(`arguments[${a}]`);
            }

            return eval(`new directive(${params.join(',')})`);
        });

        return result;
    }

}