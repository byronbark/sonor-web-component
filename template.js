export const templateContent = `
    <div id="headerbar" class="block-multi-item bg-black text-white d-flex flex-column justify-content-start flex-xl-row align-items-left p-1 position-relative">
        <btn id="input-1" class="btn btn-secondary text-black mr-1">Demo</btn>
        <btn id="input-2" class="btn btn-secondary mr-1">J1</btn>
        <btn id="input-3" class="btn btn-secondary mr-1">J7</btn>
        <div class="dropdown mb-0">
            <button class="btn btn-secondary btn-icon-left dropdown-toggle" type="button" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Évolution
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div id='map' style='width: 100%; height: 400px;'>
            </div>
        </div>
        <div class="col-md-4 mb-0 pt-0">
            <div class="card pt-10">
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </div>
    <div class="container pl-0 pr-0" id="template-body">
        <span class="font-weight-bold font-size-36 mb-5 mt-5">
        <i class="icon icon-border-top-left-3 font-size-28 btn-link ml-2 mb-2"></i>
            Sonor Dashboard
        </span>
        </div>
    </div>
    
`;