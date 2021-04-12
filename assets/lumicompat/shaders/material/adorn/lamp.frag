#include frex:shaders/api/fragment.glsl
#include frex:shaders/api/world.glsl
#include lumiext:shaders/lib/bump.glsl
#include lumiext:shaders/internal/frag.glsl

/******************************************************
  lumicompat:shaders/material/adorn/lamp.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
    if (frx_modelOriginType() == MODEL_ORIGIN_REGION) {
        vec3 pos = frx_var2.xyz;
        float mag = 2.0*abs(0.6-fract(pos.y));
        data.emissivity = smoothstep(0.3, 1.0, 1.0-mag*mag);
    }

    vec4 c = data.spriteColor;
    float min_ = min( min(c.r, c.g), c.b );
    float max_ = max( max(c.r, c.g), c.b );
    float s = max_ > 0 ? (max_ - min_) / max_ : 0;
    
#ifdef LUMI_PBRX
    pbr_roughness = 0.5;
#endif

#ifdef LUMI_BUMP
#ifdef LUMIEXT_ApplyBumpDefault
    _applyBump(data);
    // data.spriteColor.rgb *= (data.vertexNormal + 1) * 0.5;
#endif
#endif
}
