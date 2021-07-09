export const templateContent = `
    <div id="headerbar" class="block-multi-item bg-black text-white flex-column justify-content-start flex-xl-row align-items-left p-1 position-relative">
        <btn id="input-1" class="btn btn-secondary mr-1">Demo</btn>
        <btn id="input-2" class="btn btn-secondary mr-1">J1</btn>
        <btn id="input-3" class="btn btn-secondary mr-1">J7</btn>
        <btn id="input-4" class="btn btn-secondary mr-1">Moyenne</btn>
    </div>
    <div class="row mb-2">
        <div class="col">
            <div id='map' style='width: 100%; height: 400px;'>
            </div>
        </div>
        <div class="col col-md-4 ">
                <div class="card justify-content-end align-items-stretch">
                    <canvas id="canvas"></canvas>
                    <div class="alert alert-warning" role="alert">
                        <span class="icon-information_outline text-info"></span>
                        <span id="canvasResult"></span>
                    </div>
                </div>
        </div>
    </div>
    <div class="container pl-0 pr-0" id="template-body">
        <span class="font-weight-bold font-size-36 mb-5 mt-5">
        <i class="icon icon-border-top-left-3 font-size-28 btn-link ml-2 mb-2"></i>
            Sonor Dashboard
        <i class="icon icon-maintien_investissement_production_neuve_et_rehabilitation_thermique font-size-28"></i>
        </span>
        </div>
    </div>
    
`;