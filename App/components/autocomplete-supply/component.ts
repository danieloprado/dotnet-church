module Components {

    export class AutocompleteSupply {
        static componentName = "appAutocompleteSupply";
        static $inject = ['ProductSupplyService'];

        text: string;
        ignore: any[];
        callback: Function;

        constructor(
            private ProductSupplyService: Services.ProductSupply) {
        }

        query(text: string) {
            return this.ProductSupplyService.query(text, (this.ignore || []).map(i => typeof i === "object" ? i.id : i));
        }

        select(supply: Interfaces.IProductSupply) {
            if (!supply) return;

            this.text = null;
            this.callback({
                $value: supply
            });
        }

    }

    angular.module('app').component(AutocompleteSupply.componentName, {
        templateUrl: "/views/components/autocomplete-supply/view.html",
        controller: AutocompleteSupply,
        bindings: {
            callback: "&",
            ignore: "="
        }
    });
}