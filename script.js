document.addEventListener('DOMContentLoaded', () => {
            
            const reactionData = {
                acids: [
                    { name: 'Ácido Acético', formula: 'CH₃COOH', R: 'CH₃CO' },
                    { name: 'Ácido Propiónico', formula: 'CH₃CH₂COOH', R: 'CH₃CH₂CO' },
                    { name: 'Ácido Butírico', formula: 'CH₃(CH₂)₂COOH', R: 'CH₃(CH₂)₂CO' },
                    { name: 'Ácido Salicílico', formula: 'C₆H₄(OH)COOH', R: 'C₆H₄(OH)CO' }
                ],
                alcohols: [
                    { name: 'Metanol', formula: 'CH₃OH', R_prime: 'OCH₃', R_prime_name: 'Metilo' },
                    { name: 'Etanol', formula: 'CH₃CH₂OH', R_prime: 'OCH₂CH₃', R_prime_name: 'Etilo' },
                    { name: 'Propanol', formula: 'CH₃CH₂CH₂OH', R_prime: 'O(CH₂)₂CH₃', R_prime_name: 'Propilo' },
                    { name: 'Isoamilo', formula: '(CH₃)₂CHCH₂CH₂OH', R_prime: 'O(CH₂)₂CH(CH₃)₂', R_prime_name: 'Isoamilo' }
                ],
                aromas: {
                    'Acetato de Etilo': 'Quitaesmalte / Pegamento',
                    'Acetato de Isoamilo': 'Plátano',
                    'Butirato de Etilo': 'Piña',
                    'Salicilato de Metilo': 'Menta / Pomada muscular'
                }
            };

            const acidSelector = document.getElementById('acid-selector');
            const alcoholSelector = document.getElementById('alcohol-selector');
            
            const acidFormulaEl = document.getElementById('acid-formula');
            const alcoholFormulaEl = document.getElementById('alcohol-formula');
            const esterFormulaEl = document.getElementById('ester-formula');
            const esterNameEl = document.getElementById('ester-name');
            const esterAromaEl = document.getElementById('ester-aroma');

            function populateSelectors() {
                reactionData.acids.forEach((acid, index) => {
                    const option = new Option(acid.name, index);
                    acidSelector.add(option);
                });
                reactionData.alcohols.forEach((alcohol, index) => {
                    const option = new Option(alcohol.name, index);
                    alcoholSelector.add(option);
                });
            }

            function updateReaction() {
                const selectedAcid = reactionData.acids[acidSelector.value];
                const selectedAlcohol = reactionData.alcohols[alcoholSelector.value];

                const esterName = `${selectedAcid.name.replace('Ácido ', '').replace('ico', 'ato')} de ${selectedAlcohol.R_prime_name}`;
                const esterFormula = selectedAcid.R + selectedAlcohol.R_prime;
                const esterAroma = reactionData.aromas[esterName] || 'Desconocido';

                acidFormulaEl.textContent = selectedAcid.formula;
                alcoholFormulaEl.textContent = selectedAlcohol.formula;
                esterFormulaEl.textContent = esterFormula;
                esterNameEl.textContent = esterName;
                esterAromaEl.textContent = esterAroma;
            }

            acidSelector.addEventListener('change', updateReaction);
            alcoholSelector.addEventListener('change', updateReaction);
            
            populateSelectors();
            updateReaction();

            const ctx = document.getElementById('aromasChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Acetato de Isoamilo', 'Butirato de Etilo', 'Salicilato de Metilo', 'Acetato de Octilo'],
                    datasets: [{
                        label: 'Ésteres y sus Aromas Característicos',
                        data: [10, 10, 10, 10], 
                        backgroundColor: [
                            'rgba(250, 204, 21, 0.6)',
                            'rgba(245, 158, 11, 0.6)',
                            'rgba(22, 163, 74, 0.6)',
                            'rgba(239, 68, 68, 0.6)'
                        ],
                        borderColor: [
                            'rgba(250, 204, 21, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(22, 163, 74, 1)',
                            'rgba(239, 68, 68, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const aromas = {
                                        'Acetato de Isoamilo': '🍌 Olor a Plátano',
                                        'Butirato de Etilo': '🍍 Olor a Piña',
                                        'Salicilato de Metilo': '🌿 Olor a Menta',
                                        'Acetato de Octilo': '🍊 Olor a Naranja'
                                    };
                                    return aromas[context.label] || context.label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                           ticks: {
                               font: {
                                   size: 14
                               }
                           }
                        }
                    }
                }
            });
        });
