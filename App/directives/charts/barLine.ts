module Directives {

    interface IScope extends angular.IScope {
        data: string;
    }

    class BarLineChart {
        static $inject = ["$rootScope", "$filter", "c3"];

        data: any;
        restrict = "E";
        scope = {
            data: "="
        };

        private chart: c3.ChartAPI;

        constructor(
            private $rootScope: angular.IRootScopeService,
            private $filter: angular.IFilterService,
            private c3: IC3) {

            this.data = {
                designed: [
                    ['data1', 38580, 42438, 46681, 48761, 50120],
                    ['data2', 31116.56, 31376.68, 34514.34, 32598.96, 30589.65],
                    ['data3', 4554.82, 7542.62, 8272.67, 9562.65, 20597.56],
                ],
                optimistic: [
                    ['data1', 45580, 44438, 48681, 50761, 54120],
                    ['data2', 15116.56, 12376.68, 10514.34, 8598.96, 12589.65],
                    ['data3', 7554.82, 10542.62, 12272.67, 14562.65, 32597.56],
                ],
                pessimistic: [
                    ['data1', 23116.56, 24376.68, 28514.34, 25598.96, 26589.65],
                    ['data2', 36580, 40438, 42681, 45761, 41120],
                    ['data3', 3554.82, 5542.62, 7272.67, 8562.65, 17597.56],
                ]

            };
        }

        link = ($scope: IScope, elem: JQuery, attrs: angular.IAttributes) => {
            elem.css({
                display: 'block',
                height: 300
            });

            this.$rootScope.$watch("headerTabs.current", () => {
                if (!this.chart) return;
                this.chart.resize();
            });

            $scope.$watch("data", () => {
                if (!this.chart) return;

                this.chart.load({
                    columns: this.data[$scope.data]
                });
            });

            this.chart = this.c3.generate({
                bindto: elem[0],
                data: {
                    columns: this.data[$scope.data],
                    names: {
                        data1: 'Receita Bruta',
                        data2: 'Despesas',
                        data3: 'Fluxo de Caixa Livre'
                    },
                    types: {
                        data1: 'bar',
                        data2: 'bar',
                        data3: "area"
                    },
                    colors: {
                        data1: 'rgba(76, 175, 80, 0.8)',
                        data2: 'rgba(213, 0, 0, 0.8)',
                        data3: '#333'
                    },
                },
                axis: {
                    x: {
                        tick: {
                            format: (x: any) => {
                                return `Ano ${x + 1}`;
                            }
                        }
                    }
                },
                tooltip: {
                    format: {
                        value: (value: any, ratio: any, id: any) => {
                            return this.$filter("currency")(value);
                        }
                    }
                }
            });

        }

    }


    angular.module("app").directive("appBarLineChart", Helpers.directiveFacotry(BarLineChart));

}
