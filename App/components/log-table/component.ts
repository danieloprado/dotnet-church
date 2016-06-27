module Components {

    export class LogTable {
        static componentName = "appLogTableComponent";
        static $inject = ["$scope", "$mdDialog", "UI", "ProductService", "ProductSupplyService"];

        type: string;
        id: any;

        query: Object;
        dataPromise: angular.IPromise<any>;
        data: Array<Factories.ILog>;

        constructor(
            private $scope: angular.IScope,
            private $mdDialog: angular.material.IDialogService,
            private UI: Providers.UI,
            private ProductService: Services.Product,
            private ProductSupplyService: Services.ProductSupply) {

            this.query = {
                order: "-date"
            };

            $scope.$watch(_ => this.id, _ => {
                if (!this.id) return;
                this.update();
            });
        }

        private update() {
            let promise: angular.IPromise<Array<Factories.ILog>>;

            switch (this.type) {
                case "product":
                    promise = this.ProductService.logs(this.id);
                    break;
                case "product-supply":
                    promise = this.ProductSupplyService.logs(this.id);
                    break;
                default:
                    console.log(`no log provider for ${this.type}`);
                    return;
            }

            this.dataPromise = promise.then(data => {
                this.data = data;
            });
        }

        details(data: Factories.ILog, $event: any) {
            const $mdDialog = this.$mdDialog;

            $mdDialog.show({
                targetEvent: $event,
                templateUrl: "/views/components/log-table/details.html",
                controller: function DetailsCtrl() {
                    this.data = data;
                    this.close = () => $mdDialog.hide();
                },
                controllerAs: "$ctrl"
            });
        }
    }

    angular.module('app').component(LogTable.componentName, {
        templateUrl: "/views/components/log-table/view.html",
        controller: LogTable,
        bindings: {
            type: "@",
            id: "="
        }
    });
}